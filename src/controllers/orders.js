import sequelize from "../config/db.js";
import * as response from "../utils/response.js";
import { Orders, OrderItems, Products } from "../models/index.js";
import { where } from "sequelize";
//Cart
export const addCart = async (req, res) => {
  const { id } = req.user;
  const { productId, qty } = req.body;
  try {
    const order = await Orders.findOrCreate({
      where: { customerId: id, status: "cart" },
      defaults: { customerId: id },
    });

    const { orderId } = order[0];

    const { price } = await Products.findOne({
      attributes: ["price"],
      where: { productId },
    });

    const totalPrice = parseFloat(price) * qty;

    const orderItems = await OrderItems.create({
      productId,
      qty,
      totalPrice,
      orderId,
    });

    response.res200Msg(orderItems, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.user;

    const [{ total }] = await OrderItems.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "total"]],
      raw: true,
    });

    await Orders.update(
      { billing: total },
      { where: { customerId: id, status: "cart" } }
    );

    const data = await Orders.findOne({
      where: { customerId: id, status: "cart" },
      include: OrderItems,
    });

    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//checkout
export const checkout = async (req, res) => {
  const { id } = req.user;
  try {
    const [{ total }] = await OrderItems.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "total"]],
      raw: true,
    });

    const [checkout] = await Orders.update(
      { billing: total, status: "pending" },
      { where: { customerId: id, status: "cart" } }
    );

    if (!checkout) {
      return response.res400("Maaf keranjang anda kosong", res);
    }
    const data = await Orders.findOne({
      where: { customerId: id },
      include: OrderItems,
    });

    response.res200Msg(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//get orders data for seller
export const getAll = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const data = await OrderItems.findAll({
      include: [
        {
          model: Orders,
          where: { status: "pending" },
          attributes: ["status"],
        },
        {
          model: Products,
          where: { sellerId: id },
          attributes: ["name", "desc", "price", "sellerId"],
        },
      ],
      raw: true,
    });

    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//delete item pada cart jika ada yang ingin di delete
export const delCartItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const delItem = await OrderItems.destroy({ where: { id: itemId } });

    if (!delItem) {
      return response.res400("Maaf item tidak ada", res);
    }
    response.res200Msg("Berhasil menghapus item", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

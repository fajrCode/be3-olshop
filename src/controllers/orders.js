import * as response from "../utils/response.js";
import { Orders, OrderItems } from "../models/index.js";
//Cart
export const addCart = async (req, res) => {
  //tambah pesanan ke cart input productId, CustomerId, Qty
  const { id } = req.user;
  const { productId, qty } = req.body;
  try {
    const order = await Orders.findOrCreate({
      where: { customerId: id, status: "cart" },
      defaults: { customerId },
    });

    const { orderId } = order[0];

    const orderItems = await OrderItems.create({
      productId,
      qty,
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
    const data = await Orders.findAll({
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
export const addCheckout = async (req, res) => {
  //perbarui orders, tambahkan price
};

export const getCheckout = async (req, res) => {
  //tampilkan checkout
};

//Orders
export const getAll = async (req, res) => {};

export const getDetail = async (req, res) => {};

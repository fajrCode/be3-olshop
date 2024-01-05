import * as response from "../utils/response.js";
import Products from "../models/products.js";

export const getAll = async (req, res) => {
  try {
    const data = await Products.findAll();
    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const add = async (req, res) => {
  const { name, desc, price } = req.body;
  const { id } = req.user;
  const harga = parseFloat(price);
  try {
    await Products.create({ name, desc, price: harga, sellerId: id });
    response.res200Msg("Product berhasil di tambahkan", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const detail = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await Products.findOne({ where: { productId } });
    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

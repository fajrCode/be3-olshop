import * as response from "../utils/response.js";
import { Products } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const data = await Products.findAll();
    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const getAllBySeller = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await Products.findAll({ where: { sellerId: id } });
    if (data.length === 0) {
      return response.res400("Maaf kamu belum memiliki products", res);
    }
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
    await Producdts.create({ name, desc, price: harga, sellerId: id });
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
    if (!data) {
      return response.res400("Maaf tidak ada barang", res);
    }
    response.res200(data, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const edit = async (req, res) => {
  const { productId } = req.params;
  const { name, desc, price } = req.body;
  const harga = parseFloat(price);
  try {
    const [result] = await Products.update(
      { name, desc, price: harga },
      { where: { productId } }
    );
    if (!result) {
      return response.res400("Maaf product tidak ada", res);
    }
    response.res200Msg("Product berhasil update", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const del = async (req, res) => {
  const { productId } = req.params;
  try {
    const delProduct = await Products.destroy({ where: { productId } });

    if (!delProduct) {
      return response.res400("Maaf product tidak ada", res);
    }
    response.res200Msg("Berhasil menghapus product", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

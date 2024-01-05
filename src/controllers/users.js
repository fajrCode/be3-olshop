import { Users } from "../models/index.js";
import { compare } from "../utils/encrypt.js";
import * as response from "../utils/response.js";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";
import blacklist from "../config/blacklist.js";

const currentTime = moment().format("YYYYMMDD-HHmmss");

export const root = (req, res) => {
  response.res200Msg("ADS Olshop API v1.0 ready to use", res);
};

export const register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  //validasi inputan email dan password
  if (!email || !password) {
    return response.res400("Mohon masukkan email atau password", res);
  }

  if (password != confirmPassword) {
    return response.res400("Maaf password yang anda masukkan tidak sama", res);
  }

  if (!role) {
    return response.res400(
      "Mohon maaf, tolong pilih role anda terlebih dahulu",
      res
    );
  }

  try {
    //cek email pada sistem
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return response.res400("Maaf email anda telah terdaftar", res);
    }

    //create data
    await Users.create({ email, password: password, role, name });
    response.res200Msg("Registrasi anda berhasil", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //validasi inputan email dan password
  if (!email || !password) {
    return response.res400("Mohon masukkan email atau password", res);
  }
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return response.res403("Maaf anda belum melakukan registrasi", res);
    }

    const validPw = await compare(password, user.password);

    if (!validPw) {
      response.res403("Maaf password yang anda masukkan salah", res);
    }

    //Berikan token
    const payload = {
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      entryTime: currentTime,
    };
    const token = jwt.sign(payload, process.env.KEY, {
      expiresIn: "2h",
    }); //set token with expires 2 hours

    response.resLogin(payload, token, res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.user;

    const maxBlacklist = await Users.count(); //sesuaikan dengan skala aplikasi

    if (blacklist.length >= maxBlacklist) {
      blacklist.splice(0, maxBlacklist / 2); //hapus token yang ada di blacklist sebanyak 1/2 penetapam max data dimulai dari index 0
    }

    //tambahkan token ke blacklist
    blacklist.push(token);

    response.res200Msg("Log out berhasil", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

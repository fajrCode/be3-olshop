import * as response from "../utils/response.js";
import jwt from "jsonwebtoken";
import blacklist from "./../config/blacklist.js";

export const token = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1] || authorization;
  console.log(token)

  if (!token) {
    return response.res401(
      "Maaf kamu tidak memiliki akses - token tidak ada",
      res
    );
  }

  if (blacklist.includes(token)) {
    return response.res401("Maaf token kamu sudah expired", res);
  }

  const secret = process.env.KEY;
  try {
    const jwtDecode = jwt.verify(token, secret);

    const user = {
      id: jwtDecode.id,
      email: jwtDecode.email,
      name: jwtDecode.name,
      role: jwtDecode.role,
      token,
    };
    req.user = user; //set data to use in the next
    next();
  } catch (error) {
    console.log(error);
    return response.res401("Maaf token kamu sudah tidak valid", res);
  }
};

export const isLogin = (req, res, next) => {
  //validasi token
  const { authorization } = req.headers;
  if (authorization) {
    return response.res401("Maaf kamu sudah berhasil masuk", res);
  }
  next();
};

export const isSeller = (req, res, next) => {
  const { role } = req.user;
  if (role != "seller") {
    return response.res401("Maaf kamu tidak punya akses", res);
  }
  next();
};

export const isCustomer = (req, res, next) => {
  const { role } = req.user;
  if (role != "customer") {
    return response.res401("Maaf kamu tidak punya akses", res);
  }
  next();
};

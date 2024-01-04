import Users from "../models/users.js";
import * as response from "../utils/response.js";

export const root = (req, res) => {
  response.res200Msg("API ready to use", res);
};

export const register = async (req, res) => {
  const { name, email, pw, confirmPw, role } = req.body;
  try {
    const data = await Users.create({email,password:pw,role})
    response.res200(data,res)
  } catch (error) {
    console.log(error);
  }
};

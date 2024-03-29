import bcrypt from "bcrypt";

const salt = 11;

export const encrypt = (pw) => {
  return bcrypt.hashSync(pw, salt);
};

export const compare = (pw, hash) => {
  return bcrypt.compare(pw, hash);
};

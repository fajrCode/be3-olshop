import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import { encrypt } from "../utils/encrypt.js";

const Users = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", encrypt(value));
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["seller", "customer"]),
      allowNull: false
    },
  },
  {
    hooks: {
      beforeValidate: (users, options) => {
        if (!users.name) {
          users.name = users.email.split("@")[0];
        }
      },
    },
  }
);

export default Users;

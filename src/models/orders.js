import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";

const Orders = sequelize.define(
  "Orders",
  {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      defaultValue: UUIDV4,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    billing: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(["cart", "pending", "paid", "complete"]),
      allowNull: false,
      defaultValue: "cart",
    },
  },
  { freezeTableName: true }
);

export default Orders;

import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";

const OrderItems = sequelize.define(
  "OrderItems",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      defaultValue: UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      defaultValue: 0,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default OrderItems;

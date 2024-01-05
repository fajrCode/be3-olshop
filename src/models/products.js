import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";

const Products = sequelize.define("Products", {
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING(100),
  },
  price: {
    type: DataTypes.DECIMAL(11, 2),
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Products;

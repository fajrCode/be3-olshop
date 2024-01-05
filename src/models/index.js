import sequelize from "../config/db.js";
import Users from "./users.js";
import Products from "./products.js";
import Orders from "./orders.js";
import OrderItems from "./order_items.js";

Users.hasMany(Products, {
  foreignKey: "sellerId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Products.belongsTo(Users, {
  foreignKey: "sellerId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Users.hasMany(Orders, {
  foreignKey: "customerId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Orders.belongsTo(Users, {
  foreignKey: "customerId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Orders.hasMany(OrderItems, {
  foreignKey: "orderId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

OrderItems.belongsTo(Orders, {
  foreignKey: "orderId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Products.hasOne(OrderItems, {
  foreignKey: "productId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

OrderItems.belongsTo(Products, {
  foreignKey: "productId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

// if (process.env.ENV == "development") {
//   sequelize.sync();
// }

export { Users, Products, Orders, OrderItems };

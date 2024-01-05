import express from "express";
import users from "./routes/users.js";
import products from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users);
app.use("/products", products);

export default app;

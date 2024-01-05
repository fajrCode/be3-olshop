import express from "express";
import users from "./routes/users.js";
import products from "./routes/products.js";
import orders from "./routes/orders.js";
import notFound from "./utils/not-found.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users);
app.use("/products", products);
app.use(orders);

app.use(notFound);

export default app;

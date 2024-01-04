import express from "express";
import root from "./routes/root.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(root);

export default app;

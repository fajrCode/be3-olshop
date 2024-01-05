import express from "express";
import users from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users);

export default app;

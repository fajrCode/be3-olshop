import express from "express";
import * as orders from "../controllers/orders.js";
const router = express.Router();

router.route("/cart").post(orders.addCart);
router.route("/cart").get(orders.getCart);

export default router;

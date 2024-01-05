import express from "express";
import * as orders from "../controllers/orders.js";
import * as auth from "../middleware/auth.js";
const router = express.Router();

router.route("/cart").post(auth.token, orders.addCart);
router.route("/cart").get(auth.token, orders.getCart);
router.route("/checkout").patch(auth.token, orders.checkout);
router.route("/orders").get(auth.token, auth.isSeller, orders.getAll);
router.route("/cart/:itemId").delete(auth.token, orders.delCartItem);

export default router;

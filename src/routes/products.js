import express from "express";
import * as products from "../controllers/products.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth.token, products.getAll);
router.route("/:productId").get(auth.token, products.detail);
router.route("/").post(auth.token, auth.isSeller, products.add);

export default router;

import express from "express";
import * as products from "../controllers/products.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth.token, products.getAll);
router.route("/:productId").get(auth.token, products.detail);
router.route("/me").get(auth.token, auth.isSeller, products.getAllBySeller);
router.route("/").post(auth.token, auth.isSeller, products.add);
router.route("/:productId").patch(auth.token, auth.isSeller, products.edit);
router.route("/:productId").delete(auth.token, auth.isSeller, products.del);

export default router;

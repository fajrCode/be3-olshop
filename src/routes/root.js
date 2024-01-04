import express from "express";
import * as rootCtrl from "../controllers/root.js";

const router = express.Router();

router.route("/").get(rootCtrl.root);
router.route("/register").post(rootCtrl.register);

export default router;

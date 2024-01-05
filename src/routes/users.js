import express from "express";
import * as userCtrl from "../controllers/users.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth.token, auth.isSeller, userCtrl.root);
router.route("/register").post(auth.isLogin, userCtrl.register);
router.route("/login").post(auth.isLogin, userCtrl.login);
router.route("/logout").get(auth.token, userCtrl.logout);

export default router;

import express from "express";
import { loginMiddleware, signupMiddleware } from "../middlewares/user.middleware.js";
import { loginController, logoutController, signupController } from "../controllers/user.controller.js";
import { verifyCookies } from "../middlewares/verify.cookies.js";


const userRouter = express.Router();

userRouter.route("/signup").post(signupMiddleware, signupController);
userRouter.route("/login").post(loginMiddleware, loginController);
userRouter.route("/logout").post(verifyCookies, logoutController);

export default userRouter;
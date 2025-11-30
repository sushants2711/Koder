import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { updateCodeMiddleware } from "../middlewares/project.middleware.js";
import { googleCodeReviewController } from "../controllers/gemni.ai.controller.js";

const genmiRoute = express.Router();

genmiRoute.route("/code-review").post(verifyCookies, updateCodeMiddleware, googleCodeReviewController);

export default genmiRoute;
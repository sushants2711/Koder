import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { allChatWithAiController, chatWithAiController, googleCodeReviewController } from "../controllers/gemni.ai.controller.js";

const genmiRoute = express.Router();

genmiRoute.route("/code-review").post(verifyCookies, googleCodeReviewController);
genmiRoute.route("/chat").post(verifyCookies, chatWithAiController);
genmiRoute.route("/all").get(verifyCookies, allChatWithAiController);

export default genmiRoute;
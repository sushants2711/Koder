import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { createProjectMiddleware, updateCodeMiddleware, updateProjectNameMiddleware } from "../middlewares/project.middleware.js";
import { createProjectController, deleteProjectController, getAllProjectsController, getProjectByIdController, updateProjectCodeController, updateProjectNameController } from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.route("/create-project").post(verifyCookies, createProjectMiddleware, createProjectController);
projectRouter.route("/update-code/:id").put(verifyCookies, updateCodeMiddleware, updateProjectCodeController);
projectRouter.route("/all").get(verifyCookies, getAllProjectsController);
projectRouter.route("/all/:id").get(verifyCookies, getProjectByIdController);
projectRouter.route("/project-delete/:id").delete(verifyCookies, deleteProjectController);
projectRouter.route("/project-update/name/:id").put(verifyCookies, updateProjectNameMiddleware, updateProjectNameController);

export default projectRouter;
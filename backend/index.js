import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./config/db.connect.js";
import userRouter from "./routers/user.router.js";
import projectRouter from "./routers/project.route.js";
import genmiRoute from "./routers/gemni.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3200;

connectDb();

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/gemni", genmiRoute);

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});
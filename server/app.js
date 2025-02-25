import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config({
    path:"./.env"
})
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

// routes import
import router from "./router/userRoutes.js";
app.use("/api/users", router);

export default app;
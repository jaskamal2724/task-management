import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


// routes import
import router from "./router/userRoutes.js";
app.use("/api/users", router);

export default app;
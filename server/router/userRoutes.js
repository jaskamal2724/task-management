import express from "express";
import {signup, login, getProfile, updateProfile, addtask, getTask } from "../controller/user.js"
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", getProfile);
router.put('/profile', updateProfile);
router.post("/addtask",authMiddleware, addtask)
router.get("/gettask",getTask)

export default router;

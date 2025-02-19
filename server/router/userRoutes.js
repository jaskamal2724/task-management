import express from "express";
import {signup, login, getProfile, updateProfile, addtask, getTask, addSubtask, updateSubtaskStatus } from "../controller/user.js"
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", getProfile);
router.put('/profile', updateProfile);
router.post("/addtask",authMiddleware, addtask)
router.get("/gettask",getTask)
router.post("/addsubtask",addSubtask)
router.put("/updatesubtask", updateSubtaskStatus)

export default router;

import express from "express";
import { signup, login, getProfile, updateProfile } from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);

router.use(authMiddleware);

router.get("/profile", getProfile);
router.put('/profile', updateProfile);


export default router;

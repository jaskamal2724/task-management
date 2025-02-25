import express from "express";
import { signup, login, getProfile, updateProfile,} from "../controller/user.js";
import { addtask, getTask, addSubtask, updateSubtaskStatus, deletetask } from "../controller/task.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.use(authMiddleware);
router.get("/gettask",getTask)
router.post("/addsubtask",addSubtask)
router.post("/addtask", authMiddleware, addtask)
router.delete("/delete", deletetask)


router.get("/profile", getProfile);
router.put('/profile', updateProfile);
router.put("/updatesubtask", updateSubtaskStatus)

export default router;

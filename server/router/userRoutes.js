import express from "express";
import { signup, login, getProfile, updateProfile, logout, getusers,} from "../controller/user.js";
import { addtask, getTask, addSubtask, updateSubtaskStatus, deletetask } from "../controller/task.js";

import authMiddleware from "../middleware/auth.js";
import { createTeam, createTeamMembers, getTeams } from "../controller/team.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/gettask", getTask)
router.post("/addsubtask",addSubtask)
router.post("/addtask", authMiddleware, addtask)
router.delete("/delete", deletetask)
router.post("/logout",logout)
router.post("/createTeam",authMiddleware, createTeam)
router.post("/createTeamMember",createTeamMembers)
router.get("/getTeams",getTeams)
router.get("/getusers",getusers)


router.get("/profile", getProfile);
router.put('/profile', updateProfile);
router.put("/updatesubtask", updateSubtaskStatus)

export default router;

import express from "express"
import { handleCreateChatGroup, handleUserJoinGroup } from "../controllers/group.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-group",auth,handleCreateChatGroup);
router.post("/join-group",auth,handleUserJoinGroup);

export const groupRoutes = router
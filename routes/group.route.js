import express from "express"
import { handleCreateChatGroup, handleGetGroupMessages, handleGetUserGroups, handleUserJoinGroup } from "../controllers/group.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-group",auth,handleCreateChatGroup);
router.post("/join-group",auth,handleUserJoinGroup);
router.get("/get-user-groups",auth,handleGetUserGroups);
router.get("/group-messages/:groupId",auth,handleGetGroupMessages)

export const groupRoutes = router
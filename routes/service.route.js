import express from "express"
import { auth } from "../middlewares/auth.js";
import { handleFetchUserInfo, handleGetAllMemory, handleGetUsersByInput, handleMessageStarred, handleUserInfoChange } from "../controllers/service.controller.js";

const router = express.Router();

router.post("/get-users", auth, handleGetUsersByInput);
router.patch("/update-userInfo", auth, handleUserInfoChange);
router.get("/user-info/:email", auth, handleFetchUserInfo);
router.post("/star-message", auth, handleMessageStarred);
router.get("/memory", auth, handleGetAllMemory);

export const serviceRoutes = router;
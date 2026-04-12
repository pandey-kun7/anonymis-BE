import express from "express"
import { auth } from "../middlewares/auth.js";
import { handleFetchUserInfo, handleGetUsersByInput, handleUserInfoChange } from "../controllers/service.controller.js";

const router = express.Router();

router.post("/get-users",auth,handleGetUsersByInput);
router.patch("/update-userInfo",auth,handleUserInfoChange);
router.get("/user-info/:email",auth,handleFetchUserInfo);

export const serviceRoutes = router;
import express from "express"
import { handleUserLogin, handleUserOtpVerification, handleUserSignup, handleUserDeleteAccount } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";

export const router = new express.Router();

router.post("/signup",handleUserSignup)
router.post("/verify-otp",handleUserOtpVerification)
router.post("/login",handleUserLogin)
router.get("/delete-user-account/:email",auth,handleUserDeleteAccount)

export const authRoutes = router;
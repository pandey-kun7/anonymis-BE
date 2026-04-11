import express from "express"
import { handleUserLogin, handleUserOtpVerification, handleUserSignup } from "../controllers/auth.controller.js";

export const router = new express.Router();

router.post("/signup",handleUserSignup)
router.post("/verify-otp",handleUserOtpVerification)
router.post("/login",handleUserLogin)

export const authRoutes = router;
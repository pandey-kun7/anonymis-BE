import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";
import { User } from "../models/user.js";
import { OTP } from "../models/userOTP.js";

export const router = new express.Router();

router.post("/signup",async (req,res)=>{

    const {email,password,userAlias,userTag} = req.body;

    const hashedPassword = await bcrypt.hash(password,12)

    const user  = await User.create({email,password:hashedPassword,userAlias,userTag});

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email,otp,expiresAt : new Date( Date.now() + 5*60*1000 ) });

    res.status(200).json({
        success:true,
        message:"OTP sent via email"
    })

})


router.post("/verify-otp",async (req,res)=>{
    
    const {email,otp} = req.body;
    
    const otpInfo = await OTP.findOne({email});
    if(!otpInfo){
        return res.status(400).json({
            success:false,
            message:"OTP not found"
        })
    }

    if( otpInfo.expiresAt < Date.now() || otpInfo.otp!==otp){
        return res.status(400).json({
            success:false,
            message:"OTP Expired or Invalid"
        })
    }

    const user = await User.findOne({email});
    user.isVerified = true;
    await user.save();
    await OTP.deleteMany({email});

    const token = jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:"7d"});

    res.status(200).json({
        success:true,
        message:"Verified successfully",
        data:token
    })

})


router.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

    if(!user.isVerified){
        return res.status(400).json({
            success:false,
            message:"Verify first"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        }) 
    }

    res.status(200).json({
        success:true,
        message:"Log in successful"
    })
})

export const authRoutes = router;
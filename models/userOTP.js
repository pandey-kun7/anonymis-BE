import mongoose from "mongoose"

const userOtpSchema = new mongoose.Schema({
    otp: { type:String,required:true },
    email: { type:String,required:true },
    expiresAt: { type:String,required:true}
})

export const OTP = mongoose.model("OTP",userOtpSchema);
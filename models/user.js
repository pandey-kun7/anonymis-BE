import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userTag : {type:String,required:true,unique:true},
    email: {type:String,required:true,unique:true},
    userAlias : {type:String,required:true},
    password : {type:String,required:true},
    avatarUrl : {type:String,defualt:""},
    isVerified : {type:Boolean,default:false}
},{
    timestamps:true
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12)
})

export const User = mongoose.model("User",userSchema);
import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    groupName: {type:String, required:true},
    groupCode: {type:String,required:true,unique:true},
    adminId: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    expiresAt: {type:Date}
},{timestamps:true})

export const Group = mongoose.model("Group",groupSchema)
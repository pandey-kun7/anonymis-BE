import mongoose from "mongoose";
import { Group } from "../models/group.js"
import { Message } from "../models/messages.js";

export const handleCreateChatGroup = async (req, res) => {
    try {
        const { groupName, expiresAt, groupCode } = req.body;

        const grp = await Group.create({
            groupName,
            groupCode,
            adminId: req.userId,
            members: [req.userId],
            expiresAt,
        })

        return res.status(200).json({
            success: true,
            message: "Group created",
            data: grp
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Err",
        })
    }
}

export const handleUserJoinGroup = async (req, res) => {
    try {
        const { groupCode } = req.body;

        const group = await Group.findOne({ groupCode });
        if (!group) {
            return res.status(400).json({
                success: false,
                message: "Group not found"
            })
        }

        if ( group.expiresAt && Date.now() > group.expiresAt) {
            return res.status(400).json({
                success: false,
                message: "Group expired"
            })
        }

        const joinedGroup = await Group.findOneAndUpdate(
            { _id : group._id},
            { $addToSet: { members: req.userId } },
        );

        return res.status(200).json({
            success: true,
            message: "Joined Group",
            data: joinedGroup
        })
    } catch (err) {
        console.log(`Err in ${handleUserJoinGroup} controller`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }

}

export const handleGetUserGroups = async (req,res)=>{
    const userId = req.userId ;

    const groups = await Group.find({members: new mongoose.Types.ObjectId(userId)});

    if(groups.length === 0){
        return res.status(400).json({
            success:false,
            message:"No joined groups"
        })
    }
    return res.status(200).json({
        success:true,
        data:groups
    })
}

export const handleGetGroupMessages = async (req,res)=>{
    const {groupId} = req.params;

    const messages = await Message.find({groupId}).sort({createdAt:1});

    if(!messages || !messages.length){
        return res.status(400).json({
            success:false,
            message:"No message found here",
            data:[]
        })
    }

    return res.status(200).json({
        success:true,
        message:"Messages are present",
        data:messages,
    })
}
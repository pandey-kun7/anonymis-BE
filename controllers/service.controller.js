import express from "express"
import { User } from "../models/user.js"
import { Group } from "../models/group.js"
import { Message } from "../models/messages.js";
import { Memory } from "../models/memory.js";

export const handleGetUsersByInput = async (req, res) => {
    try {
        const { userSearch, email } = req.body;

        let users = await User.find({
            userTag: { $regex: userSearch }
        })

        if (!users.length) {
            users = await User.find({
                userAlias: { $regex: userSearch }
            })
        }

        users = users.filter((user) => user.email !== email)

        return res.status(200).json({
            success: true,
            message: "User List returned",
            data: users
        })
    } catch (err) {
        console.log("Problem in service controller");
        return res.status(500).json({
            success: false,
            message: "Interval Server Error",
        })
    }

}

export const handleUserInfoChange = async (req, res) => {
    try {
        const { userAlias, email, userTag } = req.body;

        const user = await User.find({ email });
        if (!user.length) {
            return res.status(500).json({
                success: false,
                message: "No user exists"
            })
        }

        await User.findOneAndUpdate({ email }, {
            $set: {
                userAlias
            }
        });

        return res.status(200).json({
            success: true,
            message: "User info updated"
        })
    } catch (error) {
        console.log(`Problem in handleUserInfoChange `, error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const handleFetchUserInfo = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.find({ email });

        if (!user.length) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User info fetched",
            data: user,
        })
    } catch (error) {
        console.log(`Problem in handleFetchUserInfo`, error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

export const handleMessageStarred = async (req, res) => {
    try {
        const { groupId, messageId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({
                success: false,
                message: `Group doesn't exist`
            })
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(400).json({
                success: false,
                message: `Message doesn't exist`
            })
        }

        if (await Memory.findOne({ messageId, groupId })) {
            return res.status(200).json({
                success: true,
                message: "Memory exists"
            })
        }

        const memory = await Memory.create({
            groupId,
            messageId,
            groupName: group.groupName,
            messageContent: message.content,
            senderTag: message.senderTag,
            visibleTo: group.members
        })

        return res.status(200).json({
            success: true,
            message: "Memory added",
            data: memory
        })


    } catch (err) {
        console.log(`Problem in handleMessagePin : ${err.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const handleGetAllMemory = async (req, res) => {
    try {
        const memories = await Memory.find({visibleTo : req.userId}).sort({pinnedAt : -1});

        return res.status(200).json({
            success : true,
            message : "Returned memories",
            data: memories
        })
    } catch (err) {
        console.log(`Error in handleGetAllMemory : ${err.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
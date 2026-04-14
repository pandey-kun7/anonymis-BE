import express from "express"
import { User } from "../models/user.js"

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
            $set:{
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
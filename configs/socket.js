import jwt from "jsonwebtoken";
import { Message } from "../models/messages.js";
import "dotenv/config"


export const initSocket = (io) => {

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            const decoded = jwt.verify(token, process.env.SECRET)
            socket.userId = decoded.userId;
            next();
        } catch (err) {
            console.error(err.message);
            return next(new Error("Unauthorized"));
        }
    })

    io.on("connection", (socket) => {
        socket.on("join", ({ groupId }) => {
            socket.join(groupId);
        })

        socket.on("send-message", async ({ groupId, text }) => {

            if (!text || !groupId) return null;

            const msg = await Message.create({
                groupId,
                senderId: socket.userId,
                content: text,
            })

            io.to(groupId).emit("receive-message", msg)
        })
    })
}
import mongoose from "mongoose"

const memorySchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId },
    groupName: { type: String, required: true },
    messageContent: { type: String, required: true },
    messageId: { type: mongoose.Schema.Types.ObjectId },
    senderTag: { type: String, required: true },
    pinnedAt: { type: Date, default: Date.now },
    visibleTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

export const Memory = mongoose.model("Memory", memorySchema)
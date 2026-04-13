import cron from "node-cron"
import { Group } from "../models/group.js"
import { Message } from "../models/messages.js"

export function deleteGroupsCronJob(io) {
    try {
        cron.schedule("*/1 * * * *", async () => {
            const expiredGroups = await Group.find({
                expiresAt: { $lt: new Date() }
            })

            // console.log(expiredGroups);

            for (const group of expiredGroups) {
                io.to(group._id.toString()).emit("group-deleted");
                await Message.deleteMany({ groupId: group._id });
                await Group.findByIdAndDelete({ _id: group._id })
            }
        })
    } catch (err) {
        console.log(`Error in cronjob ${err.message}`)
    }
}
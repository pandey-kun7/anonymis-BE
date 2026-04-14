import cron from "node-cron"
import { User } from "../models/user.js"

export function deleteUnverifiedUsers(){
    try{
        cron.schedule("*/5 * * * *", async ()=>{
            await User.deleteMany({isVerified:false});
        })
    }catch(err){
        console.log(`ERR in deleteUnverifiedUsers: ${err.message}`)
    }
}
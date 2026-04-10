import mongoose from "mongoose"

export const connect = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at ${process.env.MONGO_URI}`);
    }catch(err){
        console.log(`MONGO DB ERR: ${err}`);
        process.exit(1);
    }
}
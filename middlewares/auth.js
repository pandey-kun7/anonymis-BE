import jwt from "jsonwebtoken"
import "dotenv/config";

export const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token does not exist"
        })
    }

    const decoded = jwt.verify(token,process.env.SECRET);
    req.userId = decoded.userId;
    next();
};
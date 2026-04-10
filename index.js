import express from "express"
import "dotenv/config";
import cors from "cors"
import { connect } from "./configs/dbConnection.js";
import { authRoutes } from "./routes/auth.js";

const app = express();

app.use(cors({origin:"*"}))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use("/api/auth",authRoutes);

connect();

app.listen(process.env.PORT,()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})
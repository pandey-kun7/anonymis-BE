import express from "express"
import "dotenv/config";
import cors from "cors"
import http from "http"
import {Server} from "socket.io"
import { connect } from "./configs/dbConnection.js";
import { authRoutes } from "./routes/auth.route.js";
import { initSocket } from "./configs/socket.js";
import { groupRoutes } from "./routes/group.route.js";
import { serviceRoutes } from "./routes/service.route.js";
import { deleteGroupsCronJob } from "./configs/deleteGroupsCron.js";
import { deleteUnverifiedUsers } from "./configs/deleteUnveifiedUserCron.js";

const app = express();

connect();

const server = http.createServer(app);
const io = new Server(server,{cors:{origin : "*"}})

initSocket(io);

app.use(cors({origin:"*"}))
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/group",groupRoutes)
app.use("/api/service",serviceRoutes)

deleteGroupsCronJob(io);
deleteUnverifiedUsers();

server.listen(process.env.PORT,()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})
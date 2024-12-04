import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/database";
import router from './routes/index';
import cookieParser from "cookie-parser"
import cors from "cors"
import { Server } from 'socket.io';
import http from 'http'

dotenv.config({})
const app = express()
const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }))
const corsOption = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
const server = http.createServer(app).listen(PORT, () => {
    connectDB().then(() => {
        console.log(
            '\n#############################################' +
            '\n********************************************' +
            `\n  🚀 🛡️   SERVER RUNNING ON PORT ${PORT}  🛡️  🚀 ` +
            '\n********************************************' +
            '\n#############################################'
        );
    })
})

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})


export const getReceiverSocketId = (receiverId: any) => {
    return userSocketMap[receiverId]
}
const userSocketMap: Record<string, any> = {};


io.on('connection', (socket) => {
    // console.log("User Connected", socket.id)

    const userId = socket.handshake.query.userId?.toString()
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        // console.log("User Disconnected", socket.id)
        delete userSocketMap[userId as string];
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})
export { app, io, server };
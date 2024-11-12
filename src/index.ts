import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/database";
import router from './routes/index';
import cookieParser from "cookie-parser"
import cors from "cors"

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
app.listen(PORT, () => {
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
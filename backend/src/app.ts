import express from 'express';
import cors from 'cors'
import http from 'http';
import adminRouter from './Routes/adminRoutes';
import { errorHandler } from './Middlewares/errorHandler';
import userRouter from './Routes/userRoutes';
import cookieParser from 'cookie-parser'
const app = express()
const server = http.createServer(app);
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: [true],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use("/admin",adminRouter)
app.use('/api',userRouter)
app.use(errorHandler);
export {server}
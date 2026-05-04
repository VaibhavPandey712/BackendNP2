import express from "express"
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import questionRoute from "./routes/question.route.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/questions", questionRoute);  // Renamed for clarity

export default app;

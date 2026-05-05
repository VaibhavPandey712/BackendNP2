import express from "express"
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import questionRoute from "./routes/question.route.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const frontendOrigin = process.env.FRONTEND_URL || "https://frontendnp2.onrender.com";

app.use(cors({
  origin: frontendOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/questions", questionRoute);  // Renamed for clarity

export default app;

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import authrouter from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration - IMPORTANT: Must be before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use("/api/auth", authrouter);
app.use("/api/user", userRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
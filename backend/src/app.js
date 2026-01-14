import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

/* 🔥 CREATE ONE CORS CONFIG */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://kids-lock.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

/* 🔥 USE SAME CONFIG EVERYWHERE */
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;

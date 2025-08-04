import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

// Load env Server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CONNECT TO DATABASE

connectDB();

// CORS CONFIGURATION

const allowedOrigins = [process.env.ADMIN_URL].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow curl or mobile app requests

      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// INCREASE BODY SIZE LIMIT FOR JSON AND URL-ENCODED FOR UPLOAD

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// API DOCUMENTATION

// HOME ROUTE

app.get("/", (req, res) => {
  res.send("Hello from Baby Mart Server");
});

// ERROR HANDLER

// START SERVER SETUP

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
  console.log(`Client URL: ${process.env.ADMIN_URL}`);
  console.log(`API docs available at: http://localhost:${PORT}/api/docs`);
});

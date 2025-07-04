import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import cardRoutes from "./routes/cardRoutes.mjs";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// MONGO_URI=mongodb://localhost:27017/qwerty
// SECRET=test
// PORT=5000
// CLIENT_URL=http://localhost:5173
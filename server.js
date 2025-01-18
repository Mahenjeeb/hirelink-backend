import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.hirelinkUI_URL,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use('/api/users',userRouter)
app.get("/", (req, resp) => {
  resp.status(200).json({ message: "CRUD API for user" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
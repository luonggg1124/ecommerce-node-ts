import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));


app.listen(PORT, () => {
  connectDB;
  console.log(`Server is running at ${PORT}`);
});

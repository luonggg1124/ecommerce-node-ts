import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";
import routesV1 from "./routes/v1";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));

app.use('/',function(req, res) {
  res.json({
    message: "Server is running",
  });
  
})
app.use('api/v1',routesV1);
app.listen(PORT, () => {
  connectDB;
  console.log(`Server is running at ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

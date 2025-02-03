import express,{Application} from "express";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import { connectDB } from "./lib/db";
import productRoutes from "./routes/v1/product.route";
import authRoutes from "./routes/v1/auth.route";

dotenv.config();
const app:Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


app.use('/api/product',productRoutes);
app.use('/api/auth',authRoutes);
app.use((req:any, res:any) => { 
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});

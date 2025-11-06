import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
origin:["https://kiswaa.onrender.com","https://kiswaa-admin.onrender.com"],
credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes)

app.get("/", (req, res) => {
  res.send("✅ Kiswa ECommerce backend is running!");
});

app.listen(port, () => {
  console.log("Hello From Server");
  console.log("MONGODB_URL:", mongoUrl); // Debug log
  console.log(`✅ Server running on http://localhost:${port}`);

  if (!mongoUrl) {
    console.error("❌ MONGODB_URL is undefined. Check your .env file.");
  } else {
    connectDb(mongoUrl); // Pass the URL directly
  }
});

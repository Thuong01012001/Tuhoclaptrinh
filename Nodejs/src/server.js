import express from "express";
import configViewEngine from "./config/viewEngine.js";
import connectDB from "./config/connectDB.js";
import initWebRoutes from "./route/web.js";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware: Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Include credentials in requests if needed
  })
);

// Middleware: Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize View Engine
configViewEngine(app);

// Initialize Routes
initWebRoutes(app);

// Handle OPTIONS preflight requests
app.options("*", cors());

// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Backend Node.js is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  });

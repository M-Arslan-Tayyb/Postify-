import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
// Load environment variables
dotenv.config();
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

// Initialize Express app
const app: Application = express();

// Middleware
app.use(express.json());


// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Routes
app.use("/api/", userRoutes);
app.use("/api/posts", postRoutes);

//middleware for global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });


export default app;

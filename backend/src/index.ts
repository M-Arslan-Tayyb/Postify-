import dotenv from "dotenv";
import http from "http";
import app from "./app";

import connectDB from "./config/database";
import { cloudinaryConnect } from "./config/cloudinary";
dotenv.config();

const port = process.env.PORT || 4001;




// Create HTTP server
const server = http.createServer(app);

// Start server
const startServer = async () => {
  try {

    await connectDB(); 

    cloudinaryConnect();


    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      console.error(`Server Error: ${err.message}`);
      process.exit(1);
    });
  } catch (err) {
    console.error(`Error starting server: ${(err as Error).message}`);
    process.exit(1);
  }
};

// Start the server
startServer();

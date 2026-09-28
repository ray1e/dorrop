import express from "express";
import { setServers } from "node:dns/promises";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn.readyState === 1) {
      console.log("Database connected succesfully");
      app.listen(ENV.PORT, () => {
        console.log(
          `Server running in ${ENV.NODE_ENV} mode on port http://localhost:${ENV.PORT}`
        );
      });
    } else {
      console.error(`Database connection failed ${error.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Failed to start server`);
    process.exit(1);
    //throw error;
  }
};

startServer();

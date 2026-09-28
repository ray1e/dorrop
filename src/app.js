import express from "express";
import { setServers } from "node:dns/promises";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import linksRouter from "./routes/links.route.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json());

app.use("/api/v1/links", linksRouter);

//api health check
app.use("/api/v1/health", (req, res) => {
  res.status(200).json({
    message: "API is running",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: "OK",
  });
});

app.use(notFound);
app.use(errorHandler);

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

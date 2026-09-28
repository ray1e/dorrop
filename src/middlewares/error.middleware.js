import ENV from "../config/env.js";

export const notFound = (req, res, next) => {
  const error = new Error(`not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode =
    error.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack:  ENV.NODE_ENV === "production" ? null : error.stack,
  });
  next(); 
};

// src/middleware/errorHandler.js

import AppError from "../Utils/AppError.js";
import { APP_CONFIG } from "../config/config.js";
const logger = (APP_CONFIG && APP_CONFIG.LOGGER) ? APP_CONFIG.LOGGER : console;

export const errorHandler = (err, req, res, next) => {
  if (!err.isOperational) {

    logger.error("Unexpected Error:", err);
    err = new AppError("Internal Server Error", 500);
  } 
  
  
  else {
    logger.warn(`Handled Error: ${err.message}`);
  }

  res.status(err.statusCode || 500).json({ status: err.status || "error", message: err.message });
};

//
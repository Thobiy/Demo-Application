// src/config/config.js
import dotenv from "dotenv";
import path from "path";

// Load .env ONCE here
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ENV object
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 4000,
  DB_NAME: process.env.DB_NAME || "nutrismart_db",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  //SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretjwt",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:4000",
  JWT_OTP_SECRET: process.env.JWT_OTP_SECRET,
  
  // SMTP / SendGrid
  SMTP_USER: process.env.SMTP_USER, 
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",

};




export const APP_CONFIG = {
  ENV,
  // placeholders to be filled in init()
  DB: null,
  REDIS: null,
  MAILER: null,
  LOGGER: null,
  JWT_SECRET: ENV.JWT_SECRET,

  // initialize subsystems before starting server
  async init() {
    try {
      // dynamic imports to avoid circular deps
      const { Logger } = await import("./logger.js");
      const { sequelize, connectDatabase } = await import("./db.js");
     // const { redisClient, connectRedis } = await import("./redis.js");
      //const { transporter, verifyMailer } = await import("./mailer.js");
      const { transporter } = await import("./mailer.js");
      // set handles
      this.LOGGER = Logger;
      this.DB = sequelize;
      //this.REDIS = redisClient;
      this.MAILER = transporter;

      // connect (will throw on failure)
      await connectDatabase();
      //await connectRedis();
      //await verifyMailer();

      this.LOGGER.info("APP_CONFIG.init: All systems initialized");
    } catch (err) {
      // if logger not available, console.error
      console.error("APP_CONFIG.init failed:", err);
      throw err;
    }
  }
};

export default APP_CONFIG;

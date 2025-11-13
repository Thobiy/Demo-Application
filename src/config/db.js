// src/config/db.js
import { Sequelize } from "sequelize";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

export const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS, {
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: "postgres",

  //dialect: "mysql",
  logging: false,

  
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    }
  }

});




export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    Logger.info("postgreSQL connected & synchronized");
  } catch (err) {
    Logger.error("PostgreSQL connection failed:", err);
    throw err;
  }
}

// src/models/OTP.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const OTP = sequelize.define("OTP", {
  
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: DataTypes.INTEGER.UNSIGNED,
  email: { type: DataTypes.STRING, allowNull: false },
  //code: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, 
  purpose: { type: DataTypes.ENUM("verify","reset"), defaultValue: "verify" },
  expiresAt: DataTypes.DATE,
  consumed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, 

{ tableName: "otps", timestamps: true });

export default OTP;

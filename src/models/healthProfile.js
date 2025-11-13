// src/models/HealthProfile.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const HealthProfile = sequelize.define("HealthProfile", {

  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  
            references: {
            model: "users",
            key: "id", },
            onDelete: "CASCADE",
            },

  age: DataTypes.INTEGER,
  gender: DataTypes.STRING,
  weight: DataTypes.FLOAT, // or DECIMAL(5,2)
  height: DataTypes.FLOAT,
  activityLevel: {
      type: DataTypes.ENUM(
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active"
      ),
      allowNull: true,
    },



  // allergies: DataTypes.STRING,
  // conditions: DataTypes.STRING,
  // dietaryGoal: DataTypes.STRING,
  // notes: DataTypes.TEXT
}, 

{ tableName: "profiles", timestamps: true });

export default HealthProfile;

// src/models/UserDietaryPreference.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserDietaryPreference = sequelize.define("UserDietaryPreference", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  preference: {
    type: DataTypes.ENUM('vegetarian', 'vegan', 'keto', 'low-carb', 'low-fat', 'halal', 'kosher'),
    allowNull: false
  }
}, {
  tableName: "user_dietary_preferences",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'preference'] // Prevent duplicate preferences for same user
    },
    {
      fields: ['userId']
    },
    {
      fields: ['preference']
    }
  ]
});

export default UserDietaryPreference;
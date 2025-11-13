// src/models/UserAllergy.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserAllergy = sequelize.define("UserAllergy", {
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
  allergy: {
    type: DataTypes.ENUM('nuts', 'dairy', 'gluten', 'shellfish', 'soy', 'eggs'),
    allowNull: false
  }
}, {
  tableName: "user_allergies",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'allergy'] // Prevent duplicate allergies for same user
    },
    {
      fields: ['userId']
    },
    {
      fields: ['allergy']
    }
  ]
});

export default UserAllergy;
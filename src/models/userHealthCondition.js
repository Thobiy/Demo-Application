// src/models/UserHealthCondition.js (USER-SPECIFIC selections)
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserHealthCondition = sequelize.define("UserHealthCondition", {
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
  healthConditionId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'health_conditions',
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  
}, {
  tableName: "user_health_conditions",
  timestamps: true,
});

export default UserHealthCondition;
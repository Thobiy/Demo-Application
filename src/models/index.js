// src/models/index.js

import User from "./user.js";
import HealthProfile from "./healthProfile.js";
import Meal from "./meal.js";
import HealthCondition from "./healthconditions.js";
import UserHealthCondition from "./userHealthCondition.js";
import UserAllergy from "./userAllergyCondition.js";
import UserDietaryPreference from "./userDietaryCondition.js";
import OTP from "./otp.js";


User.hasOne(HealthProfile, { foreignKey: "userId", as: "healthProfile", onDelete: "CASCADE" });
HealthProfile.belongsTo(User, { foreignKey: "userId", as: "user" });

// User - HealthCondition relationships
User.belongsToMany(HealthCondition, {
  through: UserHealthCondition,
  foreignKey: 'userId',
  otherKey: 'healthConditionId',
  as: 'healthConditions'
});

HealthCondition.belongsToMany(User, {
  through: UserHealthCondition,
  foreignKey: 'healthConditionId',
  otherKey: 'userId',
  as: 'users'
});

User.hasMany(UserHealthCondition, {
  foreignKey: 'userId',
  as: 'userHealthConditionRecords'
});

HealthCondition.hasMany(UserHealthCondition, {
  foreignKey: 'healthConditionId',
  as: 'userHealthConditionRecords'
});

UserHealthCondition.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

UserHealthCondition.belongsTo(HealthCondition, {
  foreignKey: 'healthConditionId',
  as: 'condition'
});

// User - Allergy relationships
User.hasMany(UserAllergy, {
  foreignKey: 'userId',
  as: 'allergies'
});

UserAllergy.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User - Dietary Preference relationships
User.hasMany(UserDietaryPreference, {
  foreignKey: 'userId',
  as: 'dietaryPreferences'
});

UserDietaryPreference.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});


User.hasMany(OTP, { foreignKey: "email", sourceKey: "email", as: "otps" });

export { User, HealthProfile, Meal, HealthCondition,UserHealthCondition, UserAllergy, UserDietaryPreference, OTP };










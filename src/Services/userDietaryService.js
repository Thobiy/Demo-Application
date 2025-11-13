// src/services/userDietaryService.js
import { UserDietaryPreference } from "../models/index.js";

class UserDietaryPreferenceService {
  async setUserDietaryPreferences(userId, preferences) {
    await UserDietaryPreference.destroy({ where: { userId } });
    
    if (preferences && preferences.length > 0) {
      const preferenceRecords = preferences.map(preference => ({
        userId,
        preference
      }));
      return await UserDietaryPreference.bulkCreate(preferenceRecords);
    }
    
    return [];
  }

  async getUserDietaryPreferences(userId) {
    return await UserDietaryPreference.findAll({
      where: { userId },
      attributes: ['id', 'preference', 'createdAt']
    });
  }

  getAvailableDietaryPreferences() {
    return ['vegetarian', 'vegan', 'keto', 'low-carb', 'low-fat', 'halal', 'kosher'];
  }
}

export default new UserDietaryPreferenceService();
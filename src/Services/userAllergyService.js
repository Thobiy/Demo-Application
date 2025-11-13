// src/services/userAllergyService.js
import { UserAllergy } from "../models/index.js";

class UserAllergyService {
  async setUserAllergies(userId, allergies) {
    await UserAllergy.destroy({ where: { userId } });
    
    if (allergies && allergies.length > 0) {
      const allergyRecords = allergies.map(allergy => ({
        userId,
        allergy
      }));
      return await UserAllergy.bulkCreate(allergyRecords);
    }
    
    return [];
  }

  async getUserAllergies(userId) {
    return await UserAllergy.findAll({
      where: { userId },
      attributes: ['id', 'allergy', 'createdAt']
    });
  }

  getAvailableAllergies() {
    return ['nuts', 'dairy', 'gluten', 'shellfish', 'soy', 'eggs'];
  }
}

export default new UserAllergyService();
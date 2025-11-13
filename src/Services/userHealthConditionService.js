// src/services/userHealthConditionService.js
import { UserHealthCondition, HealthCondition } from "../models/index.js";

class UserHealthConditionService {
  async setUserHealthConditions(userId, conditionIds) {
    await UserHealthCondition.destroy({ where: { userId } });
    
    if (conditionIds && conditionIds.length > 0) {
      const conditionRecords = conditionIds.map(healthConditionId => ({
        userId,
        healthConditionId
      }));
      return await UserHealthCondition.bulkCreate(conditionRecords);
    }
    
    return [];
  }

  async getUserHealthConditions(userId) {
    return await UserHealthCondition.findAll({
      where: { userId },
      include: [{
        model: HealthCondition,
        as: 'condition'
      }]
    });
  }

  async getAvailableHealthConditions() {
    return await HealthCondition.findAll({
      attributes: ['id', 'condition', 'description']
    });
  }
}

export default new UserHealthConditionService();
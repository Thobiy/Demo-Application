// src/services/profileService.js
import { HealthProfile } from "../models/index.js";
import userHealthConditionService from "./userHealthConditionService.js";
import userAllergyService from "./userAllergyService.js";
import userDietaryService from "./userDietaryService.js";

export const profileService = {
  // Basic CRUD operations
  async createOrUpdate(userId, data) {
    let p = await HealthProfile.findOne({ where: { userId } });
    if (p) p = await p.update(data);
    else p = await HealthProfile.create({ ...data, userId });
    return p;
  },

  async get(userId) { 
    return await HealthProfile.findOne({ where: { userId } }); 
  },

  async delete(userId) { 
    return await HealthProfile.destroy({ where: { userId } }); 
  },

  // Complete profile with all related data
  async getCompleteProfile(userId) {
    const healthProfile = await this.get(userId);
    const healthConditions = await userHealthConditionService.getUserHealthConditions(userId);
    const allergies = await userAllergyService.getUserAllergies(userId);
    const dietary = await userDietaryPreferenceService.getUserDietary(userId);

    return {
      basicInfo: healthProfile,
      healthConditions,
      allergies,
      dietary
    };
  },

  // Profile data for form (with available options)
  async getProfileForForm(userId) {
    const completeProfile = await this.getCompleteProfile(userId);
    const availableConditions = await userHealthConditionService.getAvailableHealthConditions();
    
    return {
      ...completeProfile,
      availableOptions: {
        conditions: availableConditions,
        allergies: userAllergyService.getAvailableAllergies(),
        dietary: userDietaryService.getAvailableDietary()
      }
    };
  },

  // Update complete profile in one call
  async updateCompleteProfile(userId, profileData) {
    const { basicInfo, healthConditions, allergies, dietary } = profileData;

    // Update basic health profile
    let healthProfile = await this.createOrUpdate(userId, basicInfo);

    // Update health conditions
    if (healthConditions !== undefined) {
      await userHealthConditionService.setUserHealthConditions(userId, healthConditions);
    }

    // Update allergies
    if (allergies !== undefined) {
      await userAllergyService.setUserAllergies(userId, allergies);
    }

    // Update dietary preferences
    if (dietary !== undefined) {
      await userDietaryService.setUserDietary(userId, dietary);
    }

    return await this.getCompleteProfile(userId);
  },

  // Get user's dietary restrictions
  async getUserDietaryRestrictions(userId) {
    const preferences = await userDietaryService.getUserDietary(userId);
    const preferenceNames = preferences.map(p => p.preference);
    
    return userDietaryService.getDietaryRestrictions(preferenceNames);
  }
};
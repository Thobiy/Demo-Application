// src/services/mealRecommendationService.js

import { HealthProfile, HealthCondition, Meal } from "../models/index.js";
import { cacheService } from "./cacheService.js";
import AppError from "../Utils/AppError.js";

export const recommendationService = {
  async getForUser(userId) {
    const cacheKey = `recs:${userId}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    const profile = await HealthProfile.findOne({ where: { userId }});

    console.log("UserID:", userId);
    console.log("Profile:", profile?.dataValues);

    if (!profile) throw new AppError("User profile not found. Create health profile first.", 400);

    const conditions = (profile.conditions || "").split(",").map(s=>s.trim()).filter(Boolean);

    console.log("Conditions to check:", conditions);
    
    if (!conditions.length) throw new AppError("No health conditions specified in profile.", 400);

    const results = [];
    const allMeals = await Meal.findAll();

       console.log("All Meals:", allMeals.map(m => m.name));

    for (const c of conditions) {
      const cond = await HealthCondition.findOne({ where: { condition: c }});
      if (!cond) continue;
      const recFoods = (cond.recommendedFoods || "").split(",").map(s=>s.trim()).filter(Boolean);
      const matchedMeals = allMeals.filter(m => {
        const hay = `${m.name} ${m.tags || ""} ${m.instructions || ""}`.toLowerCase();
        return recFoods.some(f => hay.includes(f.toLowerCase()));
      }).slice(0,8);

      results.push({
        condition: cond.condition,
        description: cond.description,
        recommendedNutrients: cond.recommendedNutrients,
        restrictedNutrients: cond.restrictedNutrients,
        recommendedFoods: cond.recommendedFoods,
        restrictedFoods: cond.restrictedFoods,
        matchedMeals: matchedMeals.map(m => ({ 
          id: m.id, name: m.name, 
          calories: m.calories, 
          protein: m.protein, 
          carbs: m.carbs, 
          fat: m.fat, 
          allergens: m.allergens, 
          tags: m.tags 
        }))
      });
    }

    await cacheService.set(cacheKey, results, 600);
    return results;
  }
};

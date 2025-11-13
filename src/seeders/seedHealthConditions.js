// src/seeders/seedHealthConditions.js

import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User, HealthProfile, Meal, HealthCondition } from "../models/index.js";

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const adminPass = await bcrypt.hash("adminpass123", 10);
    const userPass = await bcrypt.hash("password123", 10);

    await User.create({
       name: "Admin", 
       email: "admin@example.com", 
       password: adminPass, 
       verified: true, 
       role: "admin" 
      });

    const user = await User.create({
       name: "Test User", 
       email: "test@example.com", 
       password: userPass, 
       verified: true, 
       role: "user" 
      });

    await HealthProfile.create({
       userId: user.id, 
       age: 35, 
       gender: "male", 
       weight: 70.5,
       height: 175.0,
      activityLevel: "Moderately Active",
       allergies: "nuts,shrimp", 
       conditions: "Diabetes", 
       dietaryGoal: "low-sugar" });

    const meals = [
      {
         name: "Grilled Chicken Salad", 
         category: "Lunch", 
         calories: 320, 
         protein: 28, 
         carbs: 12, fat: 8, 
         allergens: "", 
         tags: "grilled,chicken,salad" 
        },

      {
         name: "Oatmeal with Fruits", 
         category: "Breakfast", 
         calories: 250, 
         protein: 6, 
         carbs: 45, 
         fat: 5, 
         allergens: "nuts", 
         tags: "oatmeal,fruits,high-fiber" 
        },

      { 
        name: "Brown Rice & Beans", 
        category: "Lunch", 
        calories: 350, 
        protein: 12, 
        carbs: 50, 
        fat: 8, 
        allergens: "", 
        tags: "brown-rice,beans,vegan" 
      },

      { 
        name: "Shrimp Stir Fry", 
        category: "Dinner", 
        calories: 420, 
        protein: 25, 
        carbs: 30, 
        fat: 15, 
        allergens: "shrimp", 
        tags: "shrimp,stir-fry" 
      },

      { 
        name: "Greek Yogurt Bowl", 
        category: "Snack", 
        calories: 200, 
        protein: 15, 
        carbs: 20, 
        fat: 4, 
        allergens: "", 
        tags: "yogurt,high-protein" 
      }

    ];

    for (const m of meals) await Meal.create(m);

    const conditions = [
      { 
        condition: "Diabetes", 
        description: "Blood sugar management", 
        recommendedNutrients: "High fibre, low glycemic carbs, lean protein", 
        restrictedNutrients: "Sugar, saturated fat", 
        recommendedFoods: "Beans, cucumber, carrot, brown rice", 
        restrictedFoods: "White rice, sugary drinks, plantain" 
      },

      { 
        condition: "Hypertension", 
        description: "High blood pressure", 
        recommendedNutrients: "Low sodium, potassium rich", 
        restrictedNutrients: "Salt, processed food", 
        recommendedFoods: "Beans, cucumber, watermelon", 
        restrictedFoods: "Canned soup, stew with too much salt" 
      },

      { 
        condition: "Ulcer", 
        description: "Stomach irritation", 
        recommendedNutrients: "Bland foods, low acid, easy to digest", 
        restrictedNutrients: "Spicy foods, caffeine, acid foods", 
        recommendedFoods: "Rice, oatmeal, ripe plantain", 
        restrictedFoods: "Pepper soup, orange, stew" 
      },

      { 
        condition: "Obesity", 
        description: "Excess weight", 
        recommendedNutrients: "Low calorie, high fibre, lean protein", 
        restrictedNutrients: "High fat, sugary snacks", 
        recommendedFoods: "Vegetables, grilled chicken, beans", 
        restrictedFoods: "Fried foods, jollof rice" 
      },

      { 
        condition: "Anaemia", 
        description: "Low red blood cells", 
        recommendedNutrients: "Iron, vitamin C, folate", 
        restrictedNutrients: "None", 
        recommendedFoods: "Beef, beans, spinach, orange", 
        restrictedFoods: "Tea, coffee" 
      }

    ];

    for (const c of conditions) await HealthCondition.create(c);

    console.log(
      "Seeding complete. Admin: admin@example.com / adminpass123 | Test: test@example.com / password123"
    );
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();

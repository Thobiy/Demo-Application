// src/controllers/userDietaryController.js
import userDietaryService from "../services/userDietaryService.js";

const userDietaryController = {
  setUserDietaryPreferences: async (req, res) => {
    try {
      const userId = req.user.id;
      const { preferences } = req.body;

      if (!Array.isArray(preferences)) {
        return res.status(400).json({
          success: false,
          message: 'Preferences must be an array'
        });
      }

      const result = await userDietaryService.setUserDietaryPreferences(userId, preferences);

      res.status(200).json({
        success: true,
        message: 'Dietary preferences updated successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating dietary preferences',
        error: error.message
      });
    }
  },

  getUserDietaryPreferences: async (req, res) => {
    try {
      const userId = req.user.id;
      const preferences = await userDietaryService.getUserDietaryPreferences(userId);

      res.status(200).json({
        success: true,
        data: preferences
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching dietary preferences',
        error: error.message
      });
    }
  }
};

export default userDietaryController;
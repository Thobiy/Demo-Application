// src/controllers/userAllergyController.js
import userAllergyService from "../services/userAllergyService.js";

const userAllergyController = {
  setUserAllergies: async (req, res) => {
    try {
      const userId = req.user.id;
      const { allergies } = req.body;

      if (!Array.isArray(allergies)) {
        return res.status(400).json({
          success: false,
          message: 'Allergies must be an array'
        });
      }

      const result = await userAllergyService.setUserAllergies(userId, allergies);

      res.status(200).json({
        success: true,
        message: 'Allergies updated successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating allergies',
        error: error.message
      });
    }
  },

  getUserAllergies: async (req, res) => {
    try {
      const userId = req.user.id;
      const allergies = await userAllergyService.getUserAllergies(userId);

      res.status(200).json({
        success: true,
        data: allergies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching allergies',
        error: error.message
      });
    }
  }
};

export default userAllergyController;
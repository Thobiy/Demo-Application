// src/controllers/userHealthConditionController.js
import userHealthConditionService from "../Services/userHealthConditionService.js";

const userHealthConditionController = {
  setUserHealthConditions: async (req, res) => {
    try {
      const userId = req.user.id;
      const { conditionIds } = req.body;

      if (!Array.isArray(conditionIds)) {
        return res.status(400).json({
          success: false,
          message: 'conditionIds must be an array'
        });
      }

      const result = await userHealthConditionService.setUserHealthConditions(userId, conditionIds);

      res.status(200).json({
        success: true,
        message: 'Health conditions updated successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating health conditions',
        error: error.message
      });
    }
  },

  getUserHealthConditions: async (req, res) => {
    try {
      const userId = req.user.id;
      const healthConditions = await userHealthConditionService.getUserHealthConditions(userId);

      res.status(200).json({
        success: true,
        data: healthConditions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching health conditions',
        error: error.message
      });
    }
  }
};

export default userHealthConditionController;
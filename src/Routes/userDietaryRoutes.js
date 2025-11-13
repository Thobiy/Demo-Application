// src/routes/userDietaryRoutes.js
import express from "express";
import userDietaryController from "../Controllers/userDietaryController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.put("/", authMiddleware, userDietaryController.setUserDietaryPreferences);
router.get("/", authMiddleware, userDietaryController.getUserDietaryPreferences);

export default router;
// src/routes/userHealthConditionRoutes.js
import express from "express";
import userHealthConditionController from "../Controllers/userHealthConditionController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// All routes use authMiddleware and get userId from req.user.id
router.put("/", authMiddleware, userHealthConditionController.setUserHealthConditions);
router.get("/", authMiddleware, userHealthConditionController.getUserHealthConditions);
//router.get("/options/available", authMiddleware, userHealthConditionController.getAvailableHealthConditions);

export default router;
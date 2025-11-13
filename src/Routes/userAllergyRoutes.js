// src/routes/userAllergyRoutes.js
import express from "express";
import userAllergyController from "../Controllers/userAllergyController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.put("/", authMiddleware, userAllergyController.setUserAllergies);
router.get("/", authMiddleware, userAllergyController.getUserAllergies);
//router.get("/options/available", authMiddleware, userAllergyController.getAvailableAllergies);

export default router;
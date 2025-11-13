// src/routes/profileRoutes.js
import express from "express";
import * as ctrl from "../Controllers/profileControllers.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// EXISTING ROUTES (unchanged)
router.post("/create", authMiddleware, ctrl.createOrUpdate);
router.get("/", authMiddleware, ctrl.getProfile);
router.delete("/", authMiddleware, ctrl.deleteProfile);

// NEW ROUTES for extended profile features
router.get("/complete", authMiddleware, ctrl.getCompleteProfile);
router.get("/form-data", authMiddleware, ctrl.getProfileForForm);
router.put("/complete", authMiddleware, ctrl.updateCompleteProfile);

export default router;
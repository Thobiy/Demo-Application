// src/mainApp.js

import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import userHealthConditionRoutes from "./Routes/userHealthConditionRoutes.js";
import userAllergyRoutes from "./Routes/userAllergyRoutes.js";
import userDietaryRoutes from "./Routes/userDietaryRoutes.js";
import mealRoutes from "./Routes/mealRoutes.js";
import { APP_CONFIG } from "./config/config.js";
import { errorHandler } from "./Middleware/errorHandler.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));



app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use((req,res,next) => { APP_CONFIG.LOGGER.info(`${req.method} ${req.originalUrl}`); next(); });

// EJS pages
app.get("/", (req,res) => {res.json({message: "Welcome to dashboard"}); });
//app.get("/", (req,res) => {res.render("user/dashboard" );})

//app.get("/", (req, res) => res.render("/"));



app.get("/auth/login", (req,res) => res.render("user/login"));
app.get("/auth/register", (req,res) => res.render("user/register"));
app.get("/health/form", (req,res) => res.render("user/healthProfile"));
app.get("/auth/verify-otp", (req, res) => {
  res.render("user/verify-otp", { message: null, email: "" });
});
app.get("/auth/change-password", (req,res) => res.render("user/change-password"));



app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/health-conditions", userHealthConditionRoutes);
app.use("/allergies", userAllergyRoutes);
app.use("/dietary", userDietaryRoutes);
app.use("/meals", mealRoutes);

// error handler
app.use(errorHandler);

//catch-all for undefined route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;

import express from "express";
import { body, validationResult } from "express-validator";
import {
  register,
  verifyOtp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  resendOtp
} from "../Controllers/authControllers.js";
import { authMiddleware, verifyAccountMiddleware } from "../Middleware/authMiddleware.js";


const router = express.Router();

// For frontend clicks and buttons to render auth pages
// router.get("/register", (req, res) => res.render("auth/register.ejs"));
// router.get("/login", (req, res) => res.render("auth/login"));
// router.get("/verify", (req, res) => res.render("auth/verify"));
// router.get("/forgot", (req, res) => res.render("auth/forgot"));
// router.get("/reset", (req, res) => res.render("auth/reset"));
// router.get("/change-password", authMiddleware ,(req, res) => res.render("auth/changePassword"));

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", errors: errors.array() });
  }
  next();
};



// Actual post routes
router.post("/register",
  [
    body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 5 }).withMessage("Name must be at least 5 characters"),
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
],
validate,
  register
);

router.post("/verify-otp",
  [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("code")
    .notEmpty().withMessage("OTP is required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 characters"),
  ],
  validate,
   verifyOtp
  );

router.post("/login",
   [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ], 
  validate,
  login);

router.post("/resend-otp", 
    [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email"),
  ],
  validate,
  resendOtp
); 
  
router.post("/forgot-password", 
  [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
  ],
  validate,
  forgotPassword
);

router.post("/reset-password", 
  [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("code")
    .notEmpty().withMessage("OTP is required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 characters"),
    body("newPassword")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ],
  validate,
  resetPassword);

// logout
router.get("/logout",authMiddleware, logout);



//  Change password route
router.post("/change-password", 
  authMiddleware, 
  [
    body("oldPassword")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("newPassword")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ],
  validate,
  changePassword);

export default router;
// src/services/authService.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from  "../Utils/AppError.js";
import { User, OTP } from "../models/index.js";
import { sendEmail } from "./emailService.js";
import { APP_CONFIG } from "../config/config.js";

//const genOtp = () => Math.floor(100000 + Math.random()*900000).toString();
const genOtp = () => Math.floor(100000 + Math.random()*900000);


export const authService = {
  async register({ name, email, password }) {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new AppError("Email already registered", 400);
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const code = genOtp();
    const expiresAt = new Date(Date.now() + 15*60*1000);
    await OTP.create({ userId: user.id, email, code, 
      purpose: "verify", expiresAt });
    await sendEmail({ to: email, subject: "Nutrismart OTP", 
      text: `Your verification code: ${code}` });
    return { id: user.id, email: user.email };
  },


   // // Resend otp - for resend cases
  // async resendOtp(userId) {
  //   const user = await User.findByPk(userId);
  //   if (!user) throw new AppError("User not found", 404);

  //   const code = genOtp();
  //   const expiresAt = new Date(Date.now() + 15*60*1000);

  //   await OTP.create({ userId: user.id, email: user.email, code, purpose: "verify", expiresAt });

  //   await sendEmail({ to: user.email, subject: "Nutrismart OTP", text: `Your verification code: ${code}` });

  //   return { message: "OTP resent successfully" };
  // },
  
  async resendOtp(email) {
  const user = await User.findOne({ where: { email }});
  if (!user) throw new AppError("User not found", 404);

  const code = genOtp();
  const expiresAt = new Date(Date.now() - 10 * 60 * 1000);

  await OTP.create({
    userId: user.id,
    email: user.email,
    code,
    purpose: "verify",
    expiresAt
  });

  await sendEmail({
    to: user.email,
    subject: "Nutrismart OTP",
    text: `Your verification code: ${code}`
  });

  return { message: "OTP resent successfully" };
},


  async verifyOtp({ email, code }) {
    const otp = await OTP.findOne({ where: { email, code: Number(code), consumed: false }});
    console.log("Received OTP:", code);
    console.log("OTP in DB:", otp);
    if (!otp || new Date() > otp.expiresAt) throw new AppError("Invalid or expired OTP", 400);
    otp.consumed = true; await otp.save();
    await User.update({ verified: true }, { where: { email }});
    return true;
  },

  
 
  async login({ email, password }) {
    const user = await User.findOne({ where: { email }});
    if (!user) throw new AppError("Invalid credentials", 400);
    if (!user.verified) throw new AppError("Account not verified", 403);
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new AppError("Invalid credentials", 400);
    const token = jwt.sign({ id: user.id, role: user.role }, APP_CONFIG.JWT_SECRET, 
      { expiresIn: "7d" });
    return { token, user: { id: user.id, name: user.name, 
      email: user.email, role: user.role 
    } };
  },

  async forgotPassword({ email }) {
    const user = await User.findOne({ where: { email }});
    if (!user) throw new AppError("User not found", 404);
    const code = genOtp();
    const expiresAt = new Date(Date.now() + 15*60*1000);
    await OTP.create({ userId: user.id, email, code, purpose: "reset", expiresAt });
    await sendEmail({ to: email, subject: "Nutrismart Password Reset OTP", 
      text: `Your password reset OTP: ${code}` 
    });

    return true;
  },

  async resetPassword({ email, code, newPassword }) {
    const otp = await OTP.findOne({ where: { email, code, purpose: "reset", consumed: false }});
    if (!otp || new Date() > otp.expiresAt) throw new AppError("Invalid or expired OTP", 400);
    otp.consumed = true; await otp.save();
    const hash = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hash }, { where: { email }});
    return true;
  },

  async changePassword({ userId, oldPassword, newPassword }) {
    const user = await User.findByPk(userId);
    if (!user) throw new AppError("User not found", 404);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) throw new AppError("Old password incorrect", 400);
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return true;
  },

  async logout() {
    return true; 
  }
};

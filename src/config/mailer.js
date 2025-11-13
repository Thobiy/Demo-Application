// src/config/mailer.js
import sgMail from "@sendgrid/mail";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

// Set API key from config
sgMail.setApiKey(ENV.SENDGRID_API_KEY);

// Export a “mailer” object with sendMail(), like Nodemailer
export const transporter = {
  async sendMail({ to, subject, text, html }) {
    try {
      await sgMail.send({ to, from: ENV.SMTP_USER, subject, text, html });
      Logger.info(`Email sent to ${to} subject=${subject}`);
    } catch (err) {
      Logger.error("SendGrid error:", err);
      throw err;
    }
  }
};
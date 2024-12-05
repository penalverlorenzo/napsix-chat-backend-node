const dotenv = require("dotenv");
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  mongodbURL: process.env.MONGODB_URL,
  frontendOrigin: process.env.FRONTEND_ORIGIN,
  demoFrontendOrigin: process.env.DEMO_FRONTEND_ORIGIN,
  openaiKey: process.env.OPENAI_API_KEY,
  nodemailerUser: process.env.MAIL_USER,
  nodemailerPassword: process.env.MAIL_PASS,
  nodemailerSupportMail: process.env.MAIL_SUPPORT,
};
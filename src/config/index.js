import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  frontendOrigin: process.env.FRONTEND_ORIGIN,
  openaiKey: process.env.OPENAI_API_KEY,
};
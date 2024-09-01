import { configDotenv } from "dotenv";

configDotenv();

interface EnvConstants {
  PORT: number;
  WEBSITE_URL: string;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
}

export const envConstants: EnvConstants = {
  PORT: parseInt(process.env.PORT as string) || 3000,
  WEBSITE_URL: process.env.WEBSITE_URL || "http://localhost:3000",
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "supersecret",
};

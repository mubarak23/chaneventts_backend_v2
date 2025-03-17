import path from "path";
import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// For debugging - remove in production
console.log("Database connection info (no password):", {
  host: process.env.DATABASE_HOSTNAME,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  // Don't log password for security reasons
  hasPassword: !!process.env.DATABASE_PASSWORD
});

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOSTNAME,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [],
  ssl: false,
  synchronize: true,
  extra: {
    max: 12,
    keepAlive: true,
    connectionTimeoutMillis: 25000,
  },
  poolErrorHandler: (err: any) => {
    console.error("Database pool error: ", err.message);
  },
};

console.log("Db connection configuration loaded");

export default config;
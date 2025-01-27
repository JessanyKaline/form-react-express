import pkg from 'pg';
import {  PoolConfig } from "pg";
import dotenv from "dotenv";


const { Pool } = pkg;

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "user_registration",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(poolConfig);

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool
  .connect()
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(-1);
  });

export default pool;

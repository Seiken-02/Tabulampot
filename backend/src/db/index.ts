import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection
  .getConnection()
  .then(() => console.log("✅ Berhasil terhubung ke database"))
  .catch((err) => console.error("❌ Gagal koneksi:", err));

export const db = drizzle(connection);
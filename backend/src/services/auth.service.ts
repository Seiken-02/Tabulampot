import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {

  static async register(
    name: string,
    email: string,
    password: string
  ) {

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "Register berhasil",
    };
  }

  static async login(
    email: string,
    password: string
  ) {

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      throw new Error("Email tidak ditemukan");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Password salah");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
    };
  }
}
import { db } from "../db";
import { plants } from "../db/schema";
import { eq, and } from "drizzle-orm";

export class PlantService {

  static async getAll(userId: number) {
    return await db
      .select()
      .from(plants)
      .where(eq(plants.userId, userId));
  }

  static async getById(
    id: number,
    userId: number
  ) {
    const result = await db
      .select()
      .from(plants)
      .where(
        and(
          eq(plants.id, id),
          eq(plants.userId, userId)
        )
      );

    return result[0];
  }

  static async create(data: any) {

    await db.insert(plants).values(data);

    return {
      message: "Tanaman berhasil ditambahkan",
    };
  }

  static async update(
    id: number,
    userId: number,
    data: any
  ) {

    await db
      .update(plants)
      .set(data)
      .where(
        and(
          eq(plants.id, id),
          eq(plants.userId, userId)
        )
      );

    return {
      message: "Tanaman berhasil diupdate",
    };
  }

  static async delete(
    id: number,
    userId: number
  ) {

    await db
      .delete(plants)
      .where(
        and(
          eq(plants.id, id),
          eq(plants.userId, userId)
        )
      );

    return {
      message: "Tanaman berhasil dihapus",
    };
  }
}
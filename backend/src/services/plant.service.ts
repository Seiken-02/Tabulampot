import { db } from "../db";
import { plants, activityLogs } from "../db/schema";
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

    const [inserted] = await db
      .insert(plants)
      .values(data)
      .$returningId(); // ambil id yang baru dibuat

    const [newPlant] = await db
      .select()
      .from(plants)
      .where(eq(plants.id, inserted.id));

    return {
      message: "Tanaman berhasil ditambahkan",
      data: newPlant,
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

    const [updatedPlant] = await db
      .select()
      .from(plants)
      .where(
        and(
          eq(plants.id, id),
          eq(plants.userId, userId)
        )
      );

    return {
      message: "Tanaman berhasil diupdate",
      data: updatedPlant,
    };
  }

  static async delete(
    id: number,
    userId: number
  ) {

    const existing = await db
      .select()
      .from(plants)
      .where(
        and(
          eq(plants.id, id),
          eq(plants.userId, userId)
        )
      );

    if (existing.length === 0) {
      throw new Error("Tanaman tidak ditemukan");
    }

    await db
      .delete(activityLogs)
      .where(eq(activityLogs.plantId, id));

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
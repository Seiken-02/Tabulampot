import { db } from "../db";
import { activityLogs, plants } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

export class ActivityService {

  private static async ensureOwnership(
    plantId: number,
    userId: number
  ) {
    const result = await db
      .select()
      .from(plants)
      .where(
        and(
          eq(plants.id, plantId),
          eq(plants.userId, userId)
        )
      );

    if (result.length === 0) {
      throw new Error("Tanaman tidak ditemukan");
    }
  }

  static async water(
    plantId: number,
    userId: number,
    notes?: string
  ) {

    await this.ensureOwnership(plantId, userId);

    await db.insert(activityLogs).values({
      plantId,
      activityType: "watering",
      activityDate: new Date(),
      notes,
    });

    return {
      message: "Penyiraman berhasil dicatat",
    };
  }

  static async fertilize(
    plantId: number,
    userId: number,
    notes?: string
  ) {

    await this.ensureOwnership(plantId, userId);

    await db.insert(activityLogs).values({
      plantId,
      activityType: "fertilizing",
      activityDate: new Date(),
      notes,
    });

    return {
      message: "Pemupukan berhasil dicatat",
    };
  }

  static async history(plantId: number, userId: number) {

    await this.ensureOwnership(plantId, userId);

    return await db
      .select()
      .from(activityLogs)
      .where(eq(activityLogs.plantId, plantId))
      .orderBy(desc(activityLogs.activityDate));
  }
}
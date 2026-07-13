import { db } from "../db";
import { activityLogs } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export class ActivityService {

  static async water(plantId: number) {

    await db.insert(activityLogs).values({
      plantId,
      activityType: "watering",
      activityDate: new Date(),
    });

    return {
      message: "Penyiraman berhasil dicatat",
    };
  }

  static async fertilize(plantId: number) {

    await db.insert(activityLogs).values({
      plantId,
      activityType: "fertilizing",
      activityDate: new Date(),
    });

    return {
      message: "Pemupukan berhasil dicatat",
    };
  }

  static async history(plantId: number) {

    return await db
      .select()
      .from(activityLogs)
      .where(eq(activityLogs.plantId, plantId))
      .orderBy(desc(activityLogs.activityDate));
  }
}
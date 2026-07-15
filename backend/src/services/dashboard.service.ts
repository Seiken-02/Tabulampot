import { db } from "../db";
import { plants, plantTypes, activityLogs } from "../db/schema";
import { eq } from "drizzle-orm";

export class DashboardService {

  static async getSummary(userId: number) {

    const userPlants = await db
      .select()
      .from(plants)
      .where(eq(plants.userId, userId));

    return {
      totalPlants: userPlants.length,
      needWatering: 0,
      needFertilizing: 0,
    };
  }

}
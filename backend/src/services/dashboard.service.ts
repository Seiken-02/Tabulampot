import { db } from "../db";
import { plants, plantTypes, activityLogs } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

export class DashboardService {

  static async getSummary(userId: number) {

    const userPlants = await db
      .select({
        id: plants.id,
        plantingDate: plants.plantingDate,
        wateringInterval: plantTypes.wateringInterval,
        fertilizingInterval: plantTypes.fertilizingInterval,
      })
      .from(plants)
      .innerJoin(
        plantTypes,
        eq(plants.plantTypeId, plantTypes.id)
      )
      .where(eq(plants.userId, userId));

    let needWatering = 0;
    let needFertilizing = 0;

    const now = new Date();

    for (const plant of userPlants) {

      const lastWatering = await db
        .select()
        .from(activityLogs)
        .where(
          and(
            eq(activityLogs.plantId, plant.id),
            eq(activityLogs.activityType, "watering")
          )
        )
        .orderBy(desc(activityLogs.activityDate))
        .limit(1);

      const lastFertilizing = await db
        .select()
        .from(activityLogs)
        .where(
          and(
            eq(activityLogs.plantId, plant.id),
            eq(activityLogs.activityType, "fertilizing")
          )
        )
        .orderBy(desc(activityLogs.activityDate))
        .limit(1);

      const wateringBaseline =
        lastWatering[0]?.activityDate ??
        new Date(plant.plantingDate ?? now);

      const fertilizingBaseline =
        lastFertilizing[0]?.activityDate ??
        new Date(plant.plantingDate ?? now);

      const daysSinceWatering = Math.floor(
        (now.getTime() - wateringBaseline.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const daysSinceFertilizing = Math.floor(
        (now.getTime() - fertilizingBaseline.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysSinceWatering >= plant.wateringInterval) {
        needWatering++;
      }

      if (daysSinceFertilizing >= plant.fertilizingInterval) {
        needFertilizing++;
      }
    }

    return {
      totalPlants: userPlants.length,
      needWatering,
      needFertilizing,
    };
  }
}
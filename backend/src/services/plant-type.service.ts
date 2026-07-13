import { db } from "../db";
import { plantTypes } from "../db/schema";

export class PlantTypeService {

  static async getAll() {
    return await db
      .select()
      .from(plantTypes);
  }

}
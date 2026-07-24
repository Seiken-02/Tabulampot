import { db } from "../db";
import { plantTypes } from "../db/schema";
import { eq } from "drizzle-orm";

export class PlantTypeService {

  static async getAll() {
    return await db
      .select()
      .from(plantTypes);
  }

  static async create(data: {
    name: string;
    wateringInterval: number;
    fertilizingInterval: number;
    description?: string;
  }) {

    const [inserted] = await db
      .insert(plantTypes)
      .values(data)
      .$returningId();

    const [newType] = await db
      .select()
      .from(plantTypes)
      .where(eq(plantTypes.id, inserted.id));

    return {
      message: "Jenis tanaman berhasil ditambahkan",
      data: newType,
    };
  }

}
import { Request, Response } from "express";
import { PlantTypeService } from "../services/plant-type.service";

export class PlantTypeController {

  static async getAll(
    req: Request,
    res: Response
  ) {

    const result =
      await PlantTypeService.getAll();

    res.json(result);

  }

}
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

  static async create(
    req: Request,
    res: Response
  ) {

    const {
      name,
      wateringInterval,
      fertilizingInterval,
      description,
    } = req.body;

    const result =
      await PlantTypeService.create({
        name,
        wateringInterval,
        fertilizingInterval,
        description,
      });

    res.status(201).json(result);

  }

}
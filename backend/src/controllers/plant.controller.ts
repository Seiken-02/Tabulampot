import { Request, Response } from "express";
import { PlantService } from "../services/plant.service";

export class PlantController {

  static async getAll(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const plants =
      await PlantService.getAll(userId);

    res.json(plants);
  }

  static async getById(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const plant =
      await PlantService.getById(
        Number(req.params.id),
        userId
      );

    res.json(plant);
  }

  static async create(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const {
      plantTypeId,
      nickname,
      plantingDate,
      location,
      notes,
    } = req.body;

    const result =
      await PlantService.create({
        userId,
        plantTypeId,
        nickname,
        plantingDate,
        location,
        notes,
      });

    res.status(201).json(result);
  }

  static async update(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const result =
      await PlantService.update(
        Number(req.params.id),
        userId,
        req.body
      );

    res.json(result);
  }

  static async delete(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const result =
      await PlantService.delete(
        Number(req.params.id),
        userId
      );

    res.json(result);
  }
}
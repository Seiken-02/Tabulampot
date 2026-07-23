import { Request, Response } from "express";
import { ActivityService } from "../services/activity.service";

export class ActivityController {

  static async water(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;
    const plantId = Number(req.params.id);
    const { notes } = req.body;

    try {
      const result =
        await ActivityService.water(plantId, userId, notes);

      res.json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async fertilize(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;
    const plantId = Number(req.params.id);
    const { notes } = req.body;

    try {
      const result =
        await ActivityService.fertilize(plantId, userId, notes);

      res.json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async history(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;
    const plantId = Number(req.params.id);

    try {
      const result =
        await ActivityService.history(plantId, userId);

      res.json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
import { Request, Response } from "express";
import { ActivityService } from "../services/activity.service";

export class ActivityController {

  static async water(
    req: Request,
    res: Response
  ) {

    const plantId = Number(req.params.id);

    const result =
      await ActivityService.water(plantId);

    res.json(result);
  }

  static async fertilize(
    req: Request,
    res: Response
  ) {

    const plantId = Number(req.params.id);

    const result =
      await ActivityService.fertilize(plantId);

    res.json(result);
  }

  static async history(
    req: Request,
    res: Response
  ) {

    const plantId = Number(req.params.id);

    const result =
      await ActivityService.history(plantId);

    res.json(result);
  }
}
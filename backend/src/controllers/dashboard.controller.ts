import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {

  static async getDashboard(
    req: Request,
    res: Response
  ) {

    const userId = (req.user as any).id;

    const result =
      await DashboardService.getSummary(userId);

    res.json(result);
  }

}
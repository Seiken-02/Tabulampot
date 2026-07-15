import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticateToken,
  DashboardController.getDashboard
);

export default router;
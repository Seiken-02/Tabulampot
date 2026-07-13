import { Router } from "express";
import { PlantTypeController } from "../controllers/plant-type.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticateToken,
  PlantTypeController.getAll
);

export default router;
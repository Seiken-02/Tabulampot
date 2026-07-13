import { Router } from "express";

import { PlantController } from "../controllers/plant.controller";
import { ActivityController } from "../controllers/activity.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();


router.get(
  "/",
  authenticateToken,
  PlantController.getAll
);

router.get(
  "/:id",
  authenticateToken,
  PlantController.getById
);

router.post(
  "/",
  authenticateToken,
  PlantController.create
);

router.put(
  "/:id",
  authenticateToken,
  PlantController.update
);

router.delete(
  "/:id",
  authenticateToken,
  PlantController.delete
);

router.post(
  "/:id/water",
  authenticateToken,
  ActivityController.water
);

router.post(
  "/:id/fertilize",
  authenticateToken,
  ActivityController.fertilize
);

router.get(
  "/:id/history",
  authenticateToken,
  ActivityController.history
);

export default router;
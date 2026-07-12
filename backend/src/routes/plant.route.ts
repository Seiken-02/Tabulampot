import { Router } from "express";
import { PlantController } from "../controllers/plant.controller";
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

export default router;
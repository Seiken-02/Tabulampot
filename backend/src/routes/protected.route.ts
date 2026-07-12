import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile",
  authenticateToken,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

export default router;
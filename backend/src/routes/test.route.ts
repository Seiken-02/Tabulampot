import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("TEST HIT");

  res.json({
    success: true,
    message: "API Berjalan"
  });
});

export default router;
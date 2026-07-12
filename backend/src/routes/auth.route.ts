import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  (req, res, next) => {
    console.log("REGISTER ROUTE HIT");
    next();
  },
  AuthController.register
);

router.post(
  "/login",
  (req, res, next) => {
    console.log("LOGIN ROUTE HIT");
    next();
  },
  AuthController.login
);

export default router;
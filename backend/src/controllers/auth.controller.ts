import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async register(req: Request, res: Response) {

    console.log("CONTROLLER REGISTER MASUK");

    try {

      const { name, email, password } = req.body;

      console.log("DATA:", { name, email });

      const result = await AuthService.register(
        name,
        email,
        password
      );

      console.log("REGISTER BERHASIL");

      return res.status(201).json(result);

    } catch (error: any) {

      console.log("REGISTER ERROR:", error);

      return res.status(400).json({
        message: error.message,
      });

    }

  }

  static async login(req: Request, res: Response) {

    console.log("CONTROLLER LOGIN MASUK");

    try {

      const { email, password } = req.body;

      console.log("DATA LOGIN:", { email });

      const result = await AuthService.login(
        email,
        password
      );

      console.log("LOGIN BERHASIL");

      return res.json(result);

    } catch (error: any) {

      console.log("LOGIN ERROR:", error);

      return res.status(400).json({
        message: error.message,
      });

    }

  }

}
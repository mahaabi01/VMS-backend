import { Request, Response } from "express";
import User from "../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";

class AuthController {
  public static async registerUser(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    console.log(req.body);
    const { name, email, password, phone, address, role } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please provide name, email and password",
      });
      return;
    }

    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 12),
      phone,
      address,
      role,
    });

    res.status(200).json({
      message: "User registered successfully.",
    });
  }

  public static async loginUser(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email and password.",
      });
      return;
    }

    //validating email and password
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!data) {
      res.status(404).json({
        message: "No user with that email.",
      });
      return;
    }

    //check password
    const isMatched = bcrypt.compareSync(password, data.password);
    if (!isMatched) {
      res.status(403).json({
        message: "Invalid password.",
      });
      return;
    }

    //token generation
    const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY as string, {
      expiresIn: "20d",
    });
    res.status(200).json({
      message: "Logged in successfully.",
      data: token,
    });
  }
}

class UserController {
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    const data = await User.findAll();
    res.status(200).json({
      message: "All users fetched successfully.",
      data,
    });
  }

  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "User ID is required." });
        return;
      }

      const data = await User.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "No user with that ID found." });
        return;
      }

      res.status(200).json({
        message: "User fetched successfully.",
        data,
      });
    } catch (error:any) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }
}

export { AuthController, UserController };

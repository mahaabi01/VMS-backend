import { NextFunction, Request, Response } from "express";
import User from "../database/models/User";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    name: string;
    role: Role;
    email: string;
    password: string;
    phone: string;
    address: string;
    id: string;
  };
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

class authMiddleware {
  async isAuthenticated(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //get token from user
    const token = req.headers.authorization;
    if (!token || token === undefined) {
      res.status(403).json({
        message: "Token not provided.",
      });
      return;
    }
    //verify token if it is legit or tampered
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, decoded: any) => {
        if (err) {
          res.status(403).json({
            message: "Invalid Token.",
          });
        } else {
          //check if that decoded object id user exist or not
          try {
            const userData = await User.findByPk(decoded.id);
            if (!userData) {
              res.status(404).json({
                message: "No user with that token.",
              });
              return;
            }
            req.user = userData;
            next();
          } catch (error) {
            console.log("Error triggered !")
            res.status(500).json({
              message: "Something went wrong.",
              error: error
            });
          }
        }
      }
    );
  }
  restrictTo(...roles: Role[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;
      console.log(userRole);
      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "You don't have permission",
        });
      } else {
        next();
      }
    };
  }
}

export default new authMiddleware();

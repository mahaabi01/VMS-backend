import express, { Router } from "express";
import { AuthController, UserController } from "../controllers/userController";
import errorHandler from "../services/catchAsyncError";

const router: Router = express.Router();

router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.loginUser));
router.route("/getAllUsers").get(errorHandler(UserController.getAllUsers));
router.route("/getUser/:id").get(errorHandler(UserController.getUserById));

export default router;

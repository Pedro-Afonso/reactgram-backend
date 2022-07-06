import express from "express";

// Controllers
import { register, login, getCurrentUser } from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";
import {
  loginValidation,
  userCreateValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";

const router = express();

router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);

export { router as UserRoutes };

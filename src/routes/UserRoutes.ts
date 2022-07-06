import express from "express";

// Controllers
import { register, getCurrentUser } from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";
import { userCreateValidation } from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";

const router = express();

router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);

export { router as UserRoutes };

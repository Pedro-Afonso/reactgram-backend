import express from "express";

// Controllers
import { register } from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";
import { userCreateValidation } from "../middlewares/userValidations";

const router = express();

router.post("/register", userCreateValidation(), validate, register);

export { router as UserRoutes };

import express from "express";

// Controllers
import { register } from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";

const router = express();

router.post("/register", validate, register);

export { router as UserRoutes };

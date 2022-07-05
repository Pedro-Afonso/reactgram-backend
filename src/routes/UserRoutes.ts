import express from "express";

// Controllers
import { register } from "../controllers/UserController";

const router = express();

router.post("/register", register);

export { router as UserRoutes };

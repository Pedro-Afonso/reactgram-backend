import express from "express";

// Controllers
import {
  register,
  login,
  getCurrentUser,
  update,
} from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";
import {
  loginValidation,
  userCreateValidation,
  userUpdateValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";

const router = express();

router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);

export { router as UserRoutes };

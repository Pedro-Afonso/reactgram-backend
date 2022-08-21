import express from "express";

// Controllers
import {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} from "../controllers/UserController";

// Middlewares
import { validate } from "../middlewares/handleValidations";
import {
  loginValidation,
  userCreateValidation,
  userUpdateValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";
import { imageUploadS3 } from "../middlewares/imageUpload";

const router = express();

router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
  "/",
  authGuard,
  imageUploadS3("reactgram-network").single("profileImage"),
  userUpdateValidation(),
  validate,
  update
);
router.get("/:id", getUserById);

export { router as UserRoutes };

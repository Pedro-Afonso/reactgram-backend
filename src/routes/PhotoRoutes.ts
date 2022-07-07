import express from "express";

const router = express.Router();

// Controller
import { insertPhoto } from "../controllers/PhotoController";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidations";
import { imageUpload } from "../middlewares/imageUpload";
import { photoInsertValidation } from "../middlewares/photoValidation";

// Middleware

// Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

export { router as PhotoRoutes };

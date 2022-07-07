import express from "express";

const router = express.Router();

// Controller
import { deletePhoto, insertPhoto } from "../controllers/PhotoController";
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
router.delete("/:id", authGuard, deletePhoto);

export { router as PhotoRoutes };
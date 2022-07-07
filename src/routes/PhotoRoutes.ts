import express from "express";

const router = express.Router();

// Controller
import {
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  insertPhoto,
  searchPhotos,
} from "../controllers/PhotoController";
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
router.get("/", getAllPhotos);
router.get("/user/:id", getUserPhotos);
router.get("/search", searchPhotos);

export { router as PhotoRoutes };

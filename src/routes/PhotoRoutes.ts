import express from "express";

const router = express.Router();

// Controller
import {
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
  searchPhotos,
  updatePhoto,
} from "../controllers/PhotoController";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidations";
import { imageUpload } from "../middlewares/imageUpload";
import {
  photoInsertValidation,
  photoUpdateValidation,
} from "../middlewares/photoValidation";

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
router.get("/:id", getPhotoById);
router.put(
  "/:id",
  authGuard,
  imageUpload.single("image"),
  photoUpdateValidation(),
  validate,
  updatePhoto
);

export { router as PhotoRoutes };

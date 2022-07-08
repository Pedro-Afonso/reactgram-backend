import express from "express";

const router = express.Router();

// Controller
import {
  commentPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
  likePhoto,
  searchPhotos,
  updatePhoto,
} from "../controllers/PhotoController";

// Middleware
import {
  commmentValidation,
  photoInsertValidation,
  photoUpdateValidation,
} from "../middlewares/photoValidation";
import { validate } from "../middlewares/handleValidations";
import { imageUpload } from "../middlewares/imageUpload";
import { authGuard } from "../middlewares/authGuard";

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
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commmentValidation(),
  validate,
  commentPhoto
);

export { router as PhotoRoutes };

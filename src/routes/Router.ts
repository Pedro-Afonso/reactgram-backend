import express from "express";
import { UserRoutes } from "./UserRoutes";
import { PhotoRoutes } from "./PhotoRoutes";

const router = express();

router.use("/api/users", UserRoutes);
router.use("/api/photos", PhotoRoutes);

export { router };

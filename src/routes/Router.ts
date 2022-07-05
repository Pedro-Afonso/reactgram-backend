import express from "express";
import { UserRoutes } from "./UserRoutes";

const router = express();

router.use("/api/users", UserRoutes);

export { router };

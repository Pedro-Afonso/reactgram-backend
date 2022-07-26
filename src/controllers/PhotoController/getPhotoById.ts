import { Request, Response } from "express";
import mongoose from "mongoose";

import { PhotoModel } from "../../models/PhotoModel";

// Get photo by id
export const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  res.status(200).json(photo);
};

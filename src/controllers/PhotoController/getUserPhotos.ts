import { Request, Response } from "express";

import { PhotoModel } from "../../models/PhotoModel";

// Get user photos
export const getUserPhotos = async (req: Request, res: Response) => {
  const { id } = req.params;
  const photos = await PhotoModel.find({ userId: id })
    .sort({ createdAt: "desc" })
    .exec();

  return res.status(200).json(photos);
};

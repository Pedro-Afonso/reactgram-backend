import { Request, Response } from "express";
import { IPhoto, PhotoModel } from "../models/PhotoModel";
import { IUser, UserModel } from "../models/UserModel";

interface IInsertPhotoRequest extends Request {
  body: IPhoto;
  user: IUser;
}

// Insert a photo, with an user related to it
const insertPhoto = async (req: IInsertPhotoRequest, res: Response) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await UserModel.findById(req.user._id);

  // Create photo
  const newPhoto = await PhotoModel.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // Check if user photo was uploaded sucessfully
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  // Return data
  res.status(201).json(newPhoto);
};

export { insertPhoto };

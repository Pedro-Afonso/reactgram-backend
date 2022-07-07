import { Request, Response } from "express";
import mongoose from "mongoose";

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

interface IDeletePhotoRequest extends Request {
  user: IUser;
}
const deletePhoto = async (req: IDeletePhotoRequest, res: Response) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
    return;
  }

  await PhotoModel.findByIdAndDelete(photo._id);

  res
    .status(200)
    .json({ id: photo._id, message: "Foto excluída com sucesso." });
};

// Get all photos
const getAllPhotos = async (_, res: Response) => {
  const photos = await PhotoModel.find({}).sort({ createdAt: "desc" }).exec();

  return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req: Request, res: Response) => {
  const { id } = req.params;
  const photos = await PhotoModel.find({ userId: id })
    .sort({ createdAt: "desc" })
    .exec();

  return res.status(200).json(photos);
};

// Get photo by id
const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  res.status(200).json(photo);
};

interface IUpdatePhotoRequest extends Request {
  user: IUser;
}
// Update a photo
const updatePhoto = async (req: IUpdatePhotoRequest, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await PhotoModel.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

interface ILikePhotoRequest extends Request {
  user: IUser;
}
// Like functionallity
const likePhoto = async (req: ILikePhotoRequest, res: Response) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await PhotoModel.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(400).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu esta foto"] });
    return;
  }

  // Put user id in array of likes
  photo.likes.push(reqUser._id);

  await photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });
};

interface ICommentPhotoRequest extends Request {
  user: IUser;
}
// Comment functionality
const commentPhoto = async (req: ICommentPhotoRequest, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await UserModel.findById(reqUser._id);

  const photo = await PhotoModel.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

// Search a photo by title
const searchPhotos = async (req: Request, res: Response) => {
  const { q } = req.query;

  const photos = await PhotoModel.find({
    title: { $regex: q, $options: "i" },
  }).exec();

  res.status(200).json(photos);
};

export {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};

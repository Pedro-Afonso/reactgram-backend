import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import "dotenv/config";

import { generatePasswordHash } from "../../utils";
import { UserModel, IUser } from "../../models/UserModel";

interface IUpdateRequest extends Request {
  body: {
    name: IUser["name"];
    password: IUser["password"];
    bio: IUser["bio"];
  };
  user: IUser;
}
// Update user
export const update = async (req: IUpdateRequest, res: Response) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await UserModel.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }
  if (password) {
    user.password = await generatePasswordHash(password);
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    if (bio === "undefined") {
      user.bio = "";
    } else {
      user.bio = bio;
    }
  }

  await user.save();

  res.status(200).json(user);
};

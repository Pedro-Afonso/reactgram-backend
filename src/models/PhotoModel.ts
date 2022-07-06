import mongoose, { Types, Schema } from "mongoose";

export interface IPhoto {
  image: string;
  title: string;
  likes: Array<string>;
  comments: Array<string>;
  userId: Types.ObjectId;
  userName: string;
}

const photoSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    likes: [{ type: String }],
    comments: [{ type: String }],
    userId: { type: Schema.Types.ObjectId },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const PhotoModel = mongoose.model<IPhoto>("PhotoModel", photoSchema);

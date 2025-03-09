import mongoose, { Schema, Document } from "mongoose";

// ✅ Define Post Interface
export interface IPost extends Document {
  title: string;
  content: string;
  thumbnail?: string; // ✅ Thumbnail is now optional
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Define Post Schema
const postSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: false }, 
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);

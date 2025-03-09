import mongoose, { Schema, Document } from "mongoose";

// Define User Interface
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "Admin" | "SuperAdmin" | "User";
  profilePicture?: string; //optional
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define User Schema
const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "SuperAdmin", "User"],
      default: "User",
    },
    profilePicture: {
      type: String, // Store image URL 
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);

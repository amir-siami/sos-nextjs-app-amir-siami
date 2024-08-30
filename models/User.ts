import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, min: 3, max: 20 },
  password: { type: String, required: true, min: 6 },
  email: { type: String, required: true, unique: true, max: 50 },
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
});

const UserModel = models.User || model<IUser>("User", userSchema);
export default UserModel;

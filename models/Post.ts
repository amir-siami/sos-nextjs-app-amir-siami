import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for the Post document
export interface IPost extends Document {
  title: string;
  slug?: string;
  image?: string; // Optional field
  description: string;
  author: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean; // Use lowercase 'boolean'
}

// Create a new Mongoose Schema for the Post model
const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
    },
    duration: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=600?w=1920&q=75", // Default image URL
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt fields
  }
);

postSchema.pre("save", function (this: any, next) {
  if (!this.slug) {
    this.slug = this._id.toString();
  }
  next();
});

const PostModel = models.post || model<IPost>("post", postSchema);

export default PostModel;

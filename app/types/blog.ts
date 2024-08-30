export interface IPost {
  _id: string;
  msg: string;
  title: string; // Add other fields as necessary
  slug: string;
  image: string;
  description: string;
  duration: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

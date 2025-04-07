import { Document, models, model, Schema } from 'mongoose';
import slugify from 'slugify'; // Install the "slugify" library using "npm install slugify"

export interface IPost {
  images: string[];
  date: Date;
  tags: string[];
  title: string;
  description: string;
  slug?: string; // New slug property
}

export type PostDocument = IPost & Document;

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    slug: { type: String, unique: true }, // Add the slug field to the schema
  },
  { timestamps: true }
);

// Generate and set the slug based on the title before saving the document
postSchema.pre<PostDocument>('save', function (next) {
  if (this.isNew || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Post = models.Post || model<PostDocument>('Post', postSchema);

export default Post;

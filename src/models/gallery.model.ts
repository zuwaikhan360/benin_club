import { Document, models, model, Schema } from 'mongoose';

export interface IGallery {
  name: string;
  image: string;
}

export type GalleryDocument = IGallery & Document;

const gallerySchema = new Schema<GalleryDocument>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Gallery =
  models.Gallery || model<GalleryDocument>('Gallery', gallerySchema);

export default Gallery;

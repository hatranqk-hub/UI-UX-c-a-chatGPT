import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  userId: string;
  prompt: string;
  url: string;
  model: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new Schema<IImage>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    prompt: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    model: {
      type: String,
      default: 'dall-e-3',
      enum: ['dall-e-2', 'dall-e-3', 'stable-diffusion']
    },
    size: {
      type: String,
      default: '1024x1024',
      enum: ['256x256', '512x512', '1024x1024']
    }
  },
  { timestamps: true }
);

export const Image = mongoose.model<IImage>('Image', imageSchema);

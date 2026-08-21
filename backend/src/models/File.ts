import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  userId: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  content?: string;
  extractedText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema<IFile>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: null
    },
    extractedText: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export const File = mongoose.model<IFile>('File', fileSchema);

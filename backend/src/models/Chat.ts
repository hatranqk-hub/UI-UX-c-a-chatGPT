import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface IChat extends Document {
  userId: string;
  title: string;
  messages: IMessage[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      default: 'New Conversation'
    },
    messages: [messageSchema],
    model: {
      type: String,
      default: 'gpt-3.5-turbo',
      enum: ['gpt-3.5-turbo', 'gpt-4', 'gemini-pro']
    }
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);

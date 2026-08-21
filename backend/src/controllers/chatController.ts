import { Response } from 'express';
import { Chat, IMessage } from '../models/Chat.js';
import { AuthRequest } from '../middleware/auth.js';
import { callOpenAI, callGemini } from '../services/aiService.js';

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, message, model = 'gpt-3.5-turbo' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    let chat;
    if (conversationId) {
      chat = await Chat.findById(conversationId);
      if (!chat || chat.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
    } else {
      chat = new Chat({
        userId: req.userId,
        model,
        title: message.substring(0, 30) + '...'
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
      createdAt: new Date()
    });

    // Get AI response
    let aiResponse: string;
    try {
      if (model.includes('gpt')) {
        aiResponse = await callOpenAI(message, chat.messages);
      } else if (model.includes('gemini')) {
        aiResponse = await callGemini(message);
      } else {
        aiResponse = 'Model not supported';
      }
    } catch (error) {
      aiResponse = 'Failed to get AI response. Please check your API keys.';
    }

    // Add assistant message
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      createdAt: new Date()
    });

    await chat.save();

    res.json({
      conversationId: chat._id,
      message: {
        role: 'assistant',
        content: aiResponse,
        createdAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .select('_id title createdAt updatedAt')
      .sort({ updatedAt: -1 });

    res.json({ conversations: chats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

export const getConversationHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat || chat.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      conversationId: chat._id,
      title: chat.title,
      model: chat.model,
      messages: chat.messages
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
};

export const deleteConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat || chat.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Chat.deleteOne({ _id: chatId });

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
};

import api from './api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  async sendMessage(message: string, conversationId?: string, model: string = 'gpt-3.5-turbo') {
    const response = await api.post('/chat/message', {
      message,
      conversationId,
      model
    });
    return response.data;
  },

  async getConversations() {
    const response = await api.get('/chat/conversations');
    return response.data.conversations;
  },

  async getConversationHistory(chatId: string) {
    const response = await api.get(`/chat/history/${chatId}`);
    return response.data;
  },

  async deleteConversation(chatId: string) {
    const response = await api.delete(`/chat/${chatId}`);
    return response.data;
  }
};

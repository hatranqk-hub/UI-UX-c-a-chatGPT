import create from 'zustand';
import { authService, AuthResponse } from '../services/authService';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AppState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  currentChatId: string | null;
  conversations: any[];
  chatMessages: any[];

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loadCurrentUser: () => void;
  setError: (error: string | null) => void;

  // Chat actions
  setCurrentChatId: (chatId: string | null) => void;
  setConversations: (conversations: any[]) => void;
  setChatMessages: (messages: any[]) => void;
  addChatMessage: (message: any) => void;
  clearChat: () => void;
}

const useStore = create<AppState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
  currentChatId: null,
  conversations: [],
  chatMessages: [],

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      set({
        user: response.user,
        token: response.token,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ email, password, name });
      set({
        user: response.user,
        token: response.token,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Registration failed',
        isLoading: false
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      chatMessages: [],
      conversations: [],
      currentChatId: null
    });
  },

  loadCurrentUser: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setCurrentChatId: (chatId: string | null) => {
    set({ currentChatId: chatId });
  },

  setConversations: (conversations: any[]) => {
    set({ conversations });
  },

  setChatMessages: (messages: any[]) => {
    set({ chatMessages: messages });
  },

  addChatMessage: (message: any) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, message]
    }));
  },

  clearChat: () => {
    set({
      chatMessages: [],
      currentChatId: null
    });
  }
}));

export default useStore;

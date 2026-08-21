import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import useStore from '../../store/useStore';

export const Sidebar: React.FC<{ onNewChat: () => void }> = ({ onNewChat }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentChatId, setCurrentChatId, clearChat } = useStore();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const convs = await chatService.getConversations();
      setConversations(convs);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (chatId: string) => {
    try {
      await chatService.deleteConversation(chatId);
      setConversations(conversations.filter(c => c._id !== chatId));
      if (currentChatId === chatId) {
        clearChat();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => {
            onNewChat();
            clearChat();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          + Cuộc Trò Chuyện Mới
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <p className="text-sm text-gray-400 font-semibold mb-3">LỊCH SỬ</p>
          {isLoading ? (
            <p className="text-gray-500 text-sm">Đang tải...</p>
          ) : conversations.length === 0 ? (
            <p className="text-gray-500 text-sm">Chưa có cuộc trò chuyện</p>
          ) : (
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv._id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    currentChatId === conv._id
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <p
                    onClick={() => setCurrentChatId(conv._id)}
                    className="text-sm text-white truncate"
                  >
                    {conv.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(conv.updatedAt).toLocaleDateString('vi-VN')}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conv._id);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 mt-2"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

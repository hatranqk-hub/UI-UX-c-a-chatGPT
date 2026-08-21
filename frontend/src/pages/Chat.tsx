import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ChatInterface } from '../components/chat/ChatInterface';
import { Sidebar } from '../components/Sidebar';
import useStore from '../store/useStore';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { clearChat } = useStore();
  const [activeTab, setActiveTab] = useState<'chat' | 'file' | 'image' | 'code'>('chat');

  const handleNewChat = () => {
    clearChat();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navigation />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNewChat={handleNewChat} />

        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              💬 Trò Chuyện
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'file'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📤 Tải Lên File
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🎨 Tạo Ảnh
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              👨‍💻 Lập Trình
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && <ChatInterface />}
            {/* Other tabs will be implemented with lazy loading */}
            {activeTab !== 'chat' && (
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-lg">Tab {activeTab} coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

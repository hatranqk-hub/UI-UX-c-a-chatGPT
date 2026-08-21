import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

export const Navigation: React.FC = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">🤖 AI Chat</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm">
                Xin chào, <strong>{user.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Đăng Xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

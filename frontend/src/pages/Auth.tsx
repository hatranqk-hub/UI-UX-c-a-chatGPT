import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🤖 AI Chat</h1>
          <p className="text-blue-100">Nền tảng AI hợp nhất</p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center mt-6">
          <p className="text-white">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-200 hover:text-white font-semibold underline"
            >
              {isLogin ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useStore from './store/useStore';
import { AuthPage } from './pages/Auth';
import { ChatPage } from './pages/Chat';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  const { loadCurrentUser } = useStore();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/register" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, loadCurrentUser } = useStore();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

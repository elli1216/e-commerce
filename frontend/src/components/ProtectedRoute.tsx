import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) return <span className="loading loading-ring loading-sm"></span>;
  if (!user) return <Navigate to='/login' replace />;

  return children;
};

export default ProtectedRoute;
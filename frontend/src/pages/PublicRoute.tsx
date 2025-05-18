import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context';

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If user is admin, redirect to /admin
  if (user && user.email?.endsWith('@admin.com')) {
    return <Navigate to="/admin" replace />;
  }

  // If user is normal user, redirect to /home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
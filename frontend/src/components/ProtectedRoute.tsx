import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring size-15"></span>
      </div>
    );

  if (!user) return <Navigate to='/login' replace />;

  // Check if user is admin based on email domain
  // then redirect to admin if true
  const isUserAdmin = user.email?.endsWith("@admin.com") || false;
  if (isUserAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
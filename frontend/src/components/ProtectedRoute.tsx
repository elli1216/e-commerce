import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context';

const ProtectedRoute = ({ children, isAdminRoute = false }: { children: React.ReactElement, isAdminRoute?: boolean }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring size-15"></span>
      </div>
    );

  if (!user) return <Navigate to='/login' replace />;

  const isUserAdmin = user.email?.endsWith('@admin.com') || false;

  if (isUserAdmin) return <Navigate to='/admin/users' replace />;

  // Only restrict access to admin routes for non-admin users
  if (isAdminRoute && !isUserAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
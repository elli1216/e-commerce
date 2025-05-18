import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/context";

const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring size-15"></span>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  // Check if user is admin based on email domain
  const isUserAdmin = user.email?.endsWith("@admin.com") || false;

  // Only allow access if user is admin
  if (!isUserAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

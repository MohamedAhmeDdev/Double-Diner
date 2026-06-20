import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthContext } from '../hook/UseAuthContext'; // adjust path as needed

export const ProtectedRoute = () => {
  const { user, loading } = UseAuthContext();

  // 1. Prevent redirection while the auth state is being determined
  if (loading) {
    return <div>Loading application...</div>; // Or a nice spinner component
  }

  // 2. If no user is authenticated, redirect to login
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  // 3. If authenticated, render the child routes
  return <Outlet />;
};

export const PublicRoute = () => {
  const { user, loading } = UseAuthContext();

  if (loading) return <div>Loading...</div>;

  // If already logged in, don't let them see Login/Forgot Password pages
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
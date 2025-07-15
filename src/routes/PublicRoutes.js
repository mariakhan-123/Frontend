// src/routes/PublicOnlyRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch (err) {
    return false; // token is invalid or malformed
  }
};

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token && isTokenValid(token)) {
    // If logged in with valid token, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Else, allow access to the public page
  return children;
};

export default PublicOnlyRoute;

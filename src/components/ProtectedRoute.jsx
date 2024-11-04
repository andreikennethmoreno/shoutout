// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust based on your Auth context

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Adjust based on your authentication logic

    // Redirect to login if not authenticated
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute; // Make sure you are using default export

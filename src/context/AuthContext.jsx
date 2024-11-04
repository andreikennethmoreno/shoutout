import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // Retrieve token from localStorage when the app starts
        return localStorage.getItem('token') || null;
    });

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token); // Store token in localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    const isAuthenticated = () => {
        return !!token; // Check if token exists
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

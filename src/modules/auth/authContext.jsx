import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated as checkAuth, login as apiLogin, logout as apiLogout } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            try {
                const currentUser = getCurrentUser();
                const isAuth = checkAuth();

                if (isAuth && currentUser) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } else {
                    // If token exists but no user (edge case), try to recover or clear
                    if (isAuth) {
                        // For now, accept it, but ideally fetch profile
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error("Auth initialization failed", err);
                apiLogout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password);

            // Immediate state update
            setUser(data.user);
            setIsAuthenticated(true);

            return data;
        } catch (error) {
            // Ensure state is clean on failure
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        apiLogout();
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

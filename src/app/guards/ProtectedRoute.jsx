import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../modules/auth/authContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    // Redirect to login if not authenticated
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

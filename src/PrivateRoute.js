import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import the context

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;  // Show a loader while checking authentication state
    }

    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if the user has the required role
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;  // Redirect to unauthorized page if the role doesn't match
    }

    // If the user is authenticated and authorized, render the child components
    return children;
};

export default PrivateRoute;

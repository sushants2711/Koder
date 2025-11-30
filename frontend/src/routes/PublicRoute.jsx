import React from 'react'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const email = localStorage.getItem("email");

    if (email) {
        return <Navigate to="/all/project" replace />
    };
    return children;
}
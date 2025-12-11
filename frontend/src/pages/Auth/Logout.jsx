import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    });
    return (
        <>
            <Helmet>
                <title>Logout</title>
            </Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">You have been logged out</h1>
                <p className="text-gray-700 mb-6">Redirecting to home page in 3s...</p>
            </div>
        </>
    );
};

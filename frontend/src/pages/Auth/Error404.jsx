import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export const Error404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Error404</title>
            </Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-700 mb-6">
                    The page you are looking for does not exist or has been moved.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                        Home
                    </button>
                </div>
            </div>
        </>
    );
};

import React from 'react'

export const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-sm">
                {icon}
            </div>
            <h3 className="text-gray-900 text-xl mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}


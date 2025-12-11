import React from 'react'

export const ValueCard = ({ icon, title, description }) => {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-sm">
                    {icon}
                </div>
                <h3 className="text-gray-900 text-xl mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </>
    )
}

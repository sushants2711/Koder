import React from 'react'

export const TeamMember = ({ name, role, image }) => {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 shadow-md"
                />
                <h3 className="text-gray-900 text-xl mb-2">{name}</h3>
                <p className="text-blue-500">{role}</p>
            </div>
        </>
    )
}

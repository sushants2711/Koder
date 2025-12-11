import React from 'react'

export const TechCard = ({ name }) => {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <p className="text-gray-700">{name}</p>
            </div>
        </>
    )
}

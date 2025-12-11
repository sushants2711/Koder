import React from 'react'

export const SocialLink = ({ icon, label, link }) => {
    return (
        <>
            <a
                href={link}
                target='_blank'
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:shadow-md hover:border-gray-300 transition-all"
            >
                {icon}
                <span>{label}</span>
            </a>
        </>
    )
}

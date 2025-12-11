import { ArrowLeft, Code2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const HeroAbout = () => {
    return (
        <>
            <div className="bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-gray-900">CodeAI Studio</span>
                        </Link>
                        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

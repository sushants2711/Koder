import { Code2 } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar2 = () => {
    const name = localStorage.getItem("name");


    return (
        <>
            <div className=" bg-white">
                <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-gray-900 hidden md:block">CodeAI Studio</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <NavLink to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</NavLink>
                            {/* <NavLink to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</NavLink> */}
                            <NavLink to={name ? "/all/projects" : "/login"} className="px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-sm hover:shadow-md">
                                Get Started
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

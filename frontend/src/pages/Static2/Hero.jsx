import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {

    const name = localStorage.getItem("name");

    return (
        <>
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Code Optimization</span>
                    </div>
                    <h1 className="text-gray-900 text-6xl mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
                        Write Better Code with <span className="text-blue-500">AI Assistance</span>
                    </h1>
                    <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Transform your coding experience with intelligent code analysis, real-time optimization suggestions, and AI-powered explanations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to={name ? "/all/projects" : "/login"}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            {name ? "Start Coding Now" : "Login"}
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            to="/about"
                            className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center"
                        >
                            Learn More
                        </Link>
                    </div>

                </div>
            </section>
        </>
    )
}

import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Hero4 = () => {
    const name = localStorage.getItem("name");

    return (
        <>
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-gray-900 text-4xl mb-6 tracking-tight">Ready to Transform Your Coding?</h2>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                        Join thousands of developers who are already coding smarter with AI assistance.
                    </p>
                    <Link to={name ? "/all/projects" : "/login"} className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
                        Start Free Today
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    )
}

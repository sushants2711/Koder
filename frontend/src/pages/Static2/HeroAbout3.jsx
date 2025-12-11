import { Sparkles, Target } from 'lucide-react'
import React from 'react'

export const HeroAbout3 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-gray-900 text-3xl mb-4 tracking-tight">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To empower developers of all skill levels with AI-powered tools that make coding faster, smarter, and more enjoyable. We believe that everyone should have access to intelligent code assistance that helps them learn and grow.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-gray-900 text-3xl mb-4 tracking-tight">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To create a world where AI and human creativity work hand-in-hand, enabling developers to focus on innovation while our intelligent systems handle optimization, debugging, and code quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

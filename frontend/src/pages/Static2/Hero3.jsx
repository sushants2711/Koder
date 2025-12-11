import { Sparkles } from 'lucide-react'
import React from 'react'
import { BenefitItem } from './BenefitItem'

export const Hero3 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-gray-900 text-4xl mb-6 tracking-tight">Why Choose CodeAI Studio?</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Our platform combines cutting-edge AI technology with an intuitive interface to help developers of all levels write better code faster.
                            </p>
                            <div className="space-y-4">
                                <BenefitItem text="Reduce debugging time by up to 60%" />
                                <BenefitItem text="Learn best practices as you code" />
                                <BenefitItem text="Improve code quality and maintainability" />
                                <BenefitItem text="Collaborate with AI for better solutions" />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-gray-200 p-8 shadow-xl">
                                <div className="h-full bg-white rounded-2xl p-6 font-mono text-sm shadow-inner">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-blue-600">// AI Analysis Active</div>
                                    <div className="text-gray-700 mt-2">function optimizeCode() {'{'}</div>
                                    <div className="text-gray-700 ml-4">const result = process();</div>
                                    <div className="text-gray-700 ml-4 flex items-center gap-2">
                                        <span>return result;</span>
                                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                                    </div>
                                    <div className="text-gray-700">{'}'}</div>
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-xs">
                                        ✨ AI Suggestion: Consider memoization for better performance
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

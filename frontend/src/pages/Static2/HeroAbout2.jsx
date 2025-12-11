import { Code2 } from 'lucide-react'
import React from 'react'

export const HeroAbout2 = () => {
    return (
        <section className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Code2 className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-gray-900 text-5xl mb-6 tracking-tight">About CodeAI Studio</h1>
                <p className="text-gray-600 text-xl leading-relaxed">
                    We're on a mission to revolutionize the way developers write code by combining the power of artificial intelligence with an intuitive, modern coding environment.
                </p>
            </div>
        </section>
    )
}

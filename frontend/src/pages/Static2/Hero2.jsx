import { Brain, Code2, MessageSquare, Play, Sparkles, Zap, } from 'lucide-react'
import React from 'react'
import { FeatureCard } from './FeatureCard'

export const Hero2 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Brain className="w-8 h-8" />}
                            title="AI Code Analysis"
                            description="Get instant insights into your code quality, performance, and potential improvements with advanced AI analysis."
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8" />}
                            title="Real-time Optimization"
                            description="Optimize your code on the fly with AI-powered suggestions that make your code faster and more efficient."
                        />
                        <FeatureCard
                            icon={<MessageSquare className="w-8 h-8" />}
                            title="Interactive Chat"
                            description="Deep dive into your projects with an AI assistant that understands your codebase and answers your questions."
                        />
                        <FeatureCard
                            icon={<Play className="w-8 h-8" />}
                            title="Instant Execution"
                            description="Run your code directly in the browser and see results immediately with our integrated runtime environment."
                        />
                        <FeatureCard
                            icon={<Code2 className="w-8 h-8" />}
                            title="Smart Editor"
                            description="Write code with intelligent autocomplete, syntax highlighting, and AI-powered code completion."
                        />
                        <FeatureCard
                            icon={<Sparkles className="w-8 h-8" />}
                            title="Code Explanations"
                            description="Understand complex code patterns with AI-generated explanations tailored to your skill level."
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

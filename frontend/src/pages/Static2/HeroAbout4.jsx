import { Heart, Users, Zap } from 'lucide-react'
import React from 'react'
import { ValueCard } from './ValueCard'

export const HeroAbout4 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-gray-900 text-4xl mb-4 tracking-tight">Our Core Values</h2>
                        <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <ValueCard
                            icon={<Zap className="w-8 h-8" />}
                            title="Innovation First"
                            description="We constantly push boundaries and explore new ways to enhance the developer experience with cutting-edge AI technology."
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8" />}
                            title="Community Driven"
                            description="Our platform is built with and for developers. We listen to feedback and evolve based on real user needs."
                        />
                        <ValueCard
                            icon={<Heart className="w-8 h-8" />}
                            title="Quality & Care"
                            description="We're committed to delivering a polished, reliable product that developers can trust for their most important projects."
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

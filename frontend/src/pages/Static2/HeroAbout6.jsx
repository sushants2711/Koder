import React from 'react'
import { TeamMember } from './TeamMember'

export const HeroAbout6 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-gray-900 text-4xl mb-4 tracking-tight">Built by Developers, for Developers</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our team consists of passionate engineers, designers, and AI researchers who understand the challenges of modern software development.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TeamMember
                            name="Sushant Singh"
                            role="Founder & CEO"
                            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                        />
                        <TeamMember
                            name="Sarah Rodriguez"
                            role="Head of AI"
                            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                        />
                        <TeamMember
                            name="Michael Kim"
                            role="Lead Engineer"
                            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

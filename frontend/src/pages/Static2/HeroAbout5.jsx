import React from 'react'
import { TechCard } from './TechCard'

export const HeroAbout5 = () => {
    return (
        <>
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-gray-900 text-4xl mb-4 tracking-tight">Powered by Modern Technology</h2>
                        <p className="text-gray-600 text-lg">Built with the latest tools and frameworks</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TechCard name="React" />
                        <TechCard name="JavaScript" />
                        <TechCard name="Node.js" />
                        <TechCard name="Express.js" />
                        <TechCard name="Python" />
                        <TechCard name="Django" />
                        <TechCard name="WebAssembly" />
                        <TechCard name="Security First" />
                    </div>
                </div>
            </section>
        </>
    )
}

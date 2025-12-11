import React from 'react'
import { Link } from 'react-router-dom'
import { SocialLink } from './SocialLink'
import { Aperture, Github, Linkedin, Twitter } from 'lucide-react'

export const HeroAbout7 = () => {

    const name = localStorage.getItem("name");

    return (
        <>
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-gray-900 text-4xl mb-6 tracking-tight">Get in Touch</h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Have questions or want to collaborate? We'd love to hear from you.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <SocialLink icon={<Github className="w-6 h-6" />} label="GitHub" link="https://github.com/sushants2711" />
                        <SocialLink icon={<Aperture className="w-6 h-6" />} label="Portfolio" link="https://sushant-singh-portfolio.onrender.com/" />
                        <SocialLink icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" link="https://www.linkedin.com/in/sushant-kumar-singh-414782230" />
                    </div>
                    <Link
                        to={name ? "/all/projects" : "/login"}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                    >
                        {name ? "Start Coding Today" : "Login"}
                    </Link>
                </div>
            </section>
        </>
    )
}

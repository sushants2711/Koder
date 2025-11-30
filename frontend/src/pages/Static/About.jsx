import React from "react";
import aboutimg from "../../assets/aboutimg.png";

export const About = () => {
    return (
        <main className="max-w-6xl mx-auto px-4 py-14">
            <section className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">About Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto mt-3">
                    We provide powerful tools that help developers write, analyze, and improve their code with AI.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <img
                    src={aboutimg}
                    className="rounded-xl shadow-lg md:h-70"
                />

                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-700 mb-6">
                        To build intelligent developer tools that enhance productivity, reduce workload,
                        and help you create high-quality software faster.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">What We Do</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>✔ AI Code Analysis</li>
                        <li>✔ Error Explanation and Fix Suggestions</li>
                        <li>✔ Code Optimization and Refactoring</li>
                        <li>✔ Multi-language Support</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

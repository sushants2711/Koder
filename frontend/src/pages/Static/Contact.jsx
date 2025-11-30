import React from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
    return (
        <main className="max-w-5xl mx-auto px-4 py-14">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Get in Touch</h1>
                <p className="text-gray-600 max-w-xl mx-auto mt-3">
                    Feel free to reach out through any of the contact options below.
                </p>
            </section>

            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-10 border">
                <div className="space-y-6 text-lg">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-xl">Phone</h3>
                        <p className="text-gray-600 mt-1">+91 79037 - 59760</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 text-xl">Email</h3>
                        <p className="text-gray-600 mt-1">sushants2711@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 text-xl">Social Links</h3>
                        <div className="flex gap-5 mt-2">
                            <a
                                href="https://www.linkedin.com/in/sushant-kumar-singh-414782230"
                                target="_blank"
                                className="text-blue-600 hover:underline text-lg"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="https://github.com/sushants2711"
                                target="_blank"
                                className="text-gray-800 hover:underline text-lg"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <p className="text-gray-600 text-center">
                            We usually respond within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

import React from "react";
import deubg from "../../assets/debug.png";

export const Home = () => {
    return (
        <>
            <main className="max-w-7xl mx-auto px-4 py-10">

                {/* Hero Section */}
                <section className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        AI Powered Code Editor
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Write your code and let the AI analyze, debug, and optimize it in seconds.
                        Supports JavaScript, Python, Java, C++, and more.
                    </p>
                </section>

                {/* Code Editor */}
                <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    {/* Editor Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <span className="text-gray-400 text-sm">script.js</span>
                    </div>

                    {/* Editor Body */}
                    <textarea
                        className="w-full h-72 p-5 font-mono text-sm text-gray-200 bg-gray-900 focus:outline-none resize-none"
                        defaultValue={
                            `// Write your code here...

function greet(name) {
    return "Hello " + name;
}

console.log(greet("Sushant"));`
                        }
                    ></textarea>
                </div>

                {/* AI Button */}
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                        Analyze Code with AI ⚡
                    </button>
                </div>

                {/* AI Output */}
                <div className="mt-10 p-6 bg-white rounded-xl shadow-md border">
                    <h2 className="text-xl font-semibold mb-3">AI Analysis Result</h2>
                    <p className="text-gray-700">
                        ✓ Your code looks clean and correct.<br />
                        ✓ `greet()` function is working properly.<br />
                        ✓ Consider using template literals for cleaner syntax:
                    </p>

                    <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-sm overflow-auto">
                        {`function greet(name) {
    return \`Hello \${name}\`;
}`}
                    </pre>
                </div>

                {/* Image + Text Section */}
                <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
                    <img
                        src={deubg}
                        alt="AI illustration"
                        className="rounded-xl shadow"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4">AI That Understands Your Code</h2>
                        <p className="text-gray-600">
                            This editor is enhanced with smart AI capabilities that
                            analyze your code, explain errors, optimize logic, and
                            suggest improvements — instantly.
                        </p>
                    </div>
                </div>

            </main>
        </>
    );
};

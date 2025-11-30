import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Brain, Play, Save, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { handleError } from "../../message/error.message";
import { handleSuccess } from "../../message/success.message";
import { getProjectByIdApi, updateCodeApi } from "../../api/projectApi";
import { aiCodeCheckerApi } from "../../api/aiApi";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";


const languageLogos = {
    Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    Cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
};

export const EditorProject = () => {
    const { id } = useParams();

    const [dataIs, setDataIs] = useState({});
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loadingAtRun, setLoadingAtRun] = useState(false);
    const [save, setSave] = useState(false);
    const [aiResult, setAiResult] = useState("");
    const resultRef = useRef(null);
    const outputRef = useRef(null);


    const fetchDataFromId = async () => {
        try {
            setLoading(true);
            const result = await getProjectByIdApi(id);

            const { success, message, error, data } = result;

            if (success) {
                setDataIs(data);
                setCode(data?.code);
            } else if (!success) {
                handleError(message);
                setDataIs({});
            } else {
                handleError(error);
                setDataIs({});
            };
        } catch (err) {
            handleError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataFromId();
    }, [id]);

    const saveCode = async () => {
        setSave(true);
        try {
            const result = await updateCodeApi(id, { code });
            console.log(result);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        } finally {
            setSave(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                saveCode();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [code]);



    const getExtension = (lang) => {
        if (!lang) return ".txt";
        switch (lang.toLowerCase()) {
            case "python": return ".py";
            case "java": return ".java";
            case "javascript": return ".js";
            case "c": return ".c";
            case "cpp": return ".cpp";
            case "bash": return ".sh";
            case "go": return ".go";
            default: return ".txt";
        }
    };

    const runCode = () => {
        setLoadingAtRun(true);
        if (!dataIs.projectLanguage) {
            handleError("Language not found");
            setLoadingAtRun(false);
            return;
        }
        const extension = getExtension(dataIs.projectLanguage);
        fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: dataIs.projectLanguage.toLowerCase(),
                version: "*",
                files: [{ filename: `${dataIs.name}${extension}`, content: code }],
                stdin: input
            })
        })
            .then(res => res.json())
            .then(data => {
                const result = data.run;
                setOutput(result?.output || "");
                setIsError(result?.code !== 0);
                // Scroll to output
                setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            })
            .catch(err => handleError(err.message))
            .finally(() => setLoadingAtRun(false));
    };


    const checkAiCodeReviewer = async () => {
        setAiResult("loading");
        try {
            const result = await aiCodeCheckerApi({ code });
            console.log(result)
            setAiResult(result);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (error) {
            handleError(error.message);
            setAiResult(""); // clear AI result on error
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 overflow-x-hidden">

            {/* Top Bar */}
            <div className="mb-6 max-w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm md:text-base shadow-lg">
                        {dataIs.name || "Loading..."}
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
                        {dataIs.projectLanguage && (
                            <img
                                src={languageLogos[dataIs.projectLanguage]}
                                alt={dataIs.projectLanguage}
                                className="h-6 w-6 md:h-7 md:w-7 object-contain"
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                        onClick={runCode}
                        disabled={loadingAtRun}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex-1 sm:flex-none text-sm md:text-base font-medium shadow-lg"
                    >
                        {loadingAtRun ? <Loader size={18} className="animate-spin" /> : <Play size={18} />}
                        <span>{loadingAtRun ? "Running" : "Run"}</span>
                    </button>

                    <button
                        onClick={saveCode}
                        disabled={save}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex-1 sm:flex-none text-sm md:text-base font-medium shadow-lg"
                    >
                        {save ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                        <span>{save ? "Saving" : "Save"}</span>
                    </button>

                    <button
                        onClick={checkAiCodeReviewer}
                        disabled={aiResult === "loading"}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex-1 sm:flex-none text-sm md:text-base font-medium shadow-lg"
                    >
                        {aiResult === "loading" ? <Loader size={18} className="animate-spin" /> : <Brain size={18} />}
                        <span>{aiResult === "loading" ? "Analyzing" : "AI"}</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            {loading ? (
                <div className="flex items-center justify-center h-96 text-center text-white text-lg font-medium">
                    <Loader size={40} className="animate-spin mx-auto mb-4" /> Loading project...
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">

                    {/* Editor */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 h-96 md:h-[500px] lg:h-[600px]">
                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 border-b border-gray-700 text-gray-300 font-semibold">
                                Code Editor
                            </div>
                            <Editor
                                height="100%"
                                theme="vs-dark"
                                language={dataIs.projectLanguage?.toLowerCase()}
                                value={code}
                                onChange={(value) => setCode(value)}
                                options={{
                                    fontSize: 16,
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    padding: { top: 12, bottom: 12 }
                                }}
                            />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 h-96 md:h-[500px] lg:h-[600px] flex flex-col">
                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 border-b border-gray-700 text-gray-300 font-semibold">Input</div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter input here..."
                                className="flex-1 p-4 bg-gray-900 text-white font-mono text-sm border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset placeholder-gray-500"
                            />
                        </div>
                    </div>

                </div>
            )}

            {/* Output */}
            {/* <div ref={outputRef} className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mb-6">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 border-b border-gray-700 text-gray-300 font-semibold">Output</div>
                <div className="h-40 md:h-48 p-4 bg-gray-900 overflow-auto">
                    <pre className={`whitespace-pre-wrap font-mono text-sm md:text-base ${isError ? "text-red-400" : "text-green-400"}`}>
                        {loadingAtRun ? (
                            <span className="text-yellow-400 flex items-center gap-2">
                                <Loader size={16} className="animate-spin" /> Running... Please wait.
                            </span>
                        ) : (
                            output || "Run the code to see output..."
                        )}
                    </pre>
                </div>
            </div> */}

            {/* Output */}
            {output ? (
                <div ref={outputRef} className="mt-6 p-4 rounded-xl bg-gray-900 text-white shadow-lg overflow-auto max-h-48">
                    <h3 className="font-bold text-green-400 mb-2">Output</h3>
                    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                        {output}
                    </div>
                </div>
            ) : (
                <div>{isError}</div>
            )
            }



            {/* AI Result */}
            {/* {aiResult && aiResult !== "loading" && (
                <div ref={resultRef} id="ai-result" className="bg-gradient-to-br from-yellow-900 to-orange-900 rounded-xl shadow-2xl overflow-hidden border border-yellow-700 p-6 animate-fadeIn">
                    <h3 className="font-bold text-yellow-300 mb-3 text-base md:text-lg flex items-center gap-2"><Brain size={20} /> AI Code Review</h3>
                    <pre className="whitespace-pre-wrap text-yellow-50 font-mono text-xs md:text-sm leading-relaxed">{aiResult}</pre>
                </div>
            )} */}

            {aiResult && aiResult !== "loading" && ( // bg-yellow-900
                <div ref={resultRef} className="mt-6 p-4 rounded-xl bg-black text-yellow-50 shadow-lg overflow-auto md:text-lg">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Brain size={20} /> AI Review Result
                    </h3>
                    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                        <Markdown rehypePlugins={[rehypeHighlight]} >
                            {aiResult}
                        </Markdown>
                    </div>
                </div>
            )
            }




        </div >
    );
};

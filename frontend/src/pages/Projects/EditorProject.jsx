import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, Save, Loader, Code2, MessageSquare, Send, Brain, Sun, Moon } from "lucide-react";
import { useParams } from "react-router-dom";
import { handleError } from "../../message/error.message";
import { handleSuccess } from "../../message/success.message";
import { getProjectByIdApi, updateCodeApi } from "../../api/projectApi";
import { aiCodeCheckerApi, allAIChatApi, sendChatApi } from "../../api/aiApi";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";


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

    // NEW STATES FOR CHAT PANEL
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chat, setChat] = useState("");
    const [chatLoader, setChatLoader] = useState(false);

    const [displayChat, setDisplayChat] = useState([]);

    const [chatError, setChatError] = useState(null);
    const [chatDisplayError, setChatDisplayError] = useState(null);


    const [darkMode, setDarkMode] = useState(true);

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
                setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            })
            .catch(err => handleError(err.message))
            .finally(() => setLoadingAtRun(false));
    };


    const checkAiCodeReviewer = async () => {
        setAiResult("loading");
        try {
            const result = await aiCodeCheckerApi({ code });
            setAiResult(result);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (error) {
            handleError(error.message);
            setAiResult("");
        };
    };


    const fetchAllAIChat = async () => {
        try {
            const result = await allAIChatApi();
            const { success, message, error, data } = result;

            if (success) {
                setDisplayChat(data);
            } else if (!success) {
                setDisplayChat([]);
                setChatDisplayError(message);
            } else {
                setDisplayChat([]);
                setChatDisplayError(error);
            };
        } catch (error) {
            setChatDisplayError(error.message);
        };
    };


    const handleSendToChat = async () => {
        if (!chat || chat.length < 10) {
            handleError("Chat length at least 10 Charcters long");
            return;
        }
        setChatLoader(true);
        try {
            const result = await sendChatApi({ chat });
            const { success, message, error } = result;

            if (success) {
                fetchAllAIChat();
                setChatLoader(false);
                setChat("");
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            };
        } catch (error) {
            setChatError(error.message);
        };
    };


    const handleChatBar = () => {
        setIsChatOpen(true);
        fetchAllAIChat();
    };



    return (
        <>
            <Helmet>
                <title>Code Editor</title>
            </Helmet>

            <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 via-indigo-900 to-white p-4 md:p-6 overflow-x-hidden">

                {/* Top Bar */}
                <div className="mb-6 max-w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                    {/* Left Side */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">

                        {/* Logo + App Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white font-semibold text-lg">CodeAI Studio</span>
                        </div>

                        {/* Project Name + Language (same line) */}
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold truncate max-w-[180px]">
                                {dataIs.name || "Loading..."}
                            </div>
                            {dataIs.projectLanguage && (
                                <img
                                    src={languageLogos[dataIs.projectLanguage]}
                                    alt={dataIs.projectLanguage}
                                    className="h-6 w-6 md:h-7 md:w-7 object-contain"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Side: Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <button
                            onClick={runCode}
                            disabled={loadingAtRun}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg"
                        >
                            {loadingAtRun ? <Loader size={18} className="animate-spin" /> : <Play size={18} />}
                            {loadingAtRun ? "Running" : "Run"}
                        </button>

                        <button
                            onClick={saveCode}
                            disabled={save}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
                        >
                            {save ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                            {save ? "Saving" : "Save"}
                        </button>

                        <button
                            onClick={checkAiCodeReviewer}
                            disabled={aiResult === "loading"}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 shadow-lg"
                        >
                            {aiResult === "loading" ? <Loader size={18} className="animate-spin" /> : <Brain size={18} />}
                            {aiResult === "loading" ? "Analyzing" : "AI"}
                        </button>
                    </div>
                </div>


                {/* Main Content */}
                {loading ? (
                    <div className="flex items-center justify-center h-96 text-white">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                        {/* Editor */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 rounded-xl shadow-xl h-[600px] overflow-hidden border border-gray-700">
                                <div className="bg-gray-700 px-4 py-3 text-gray-300 border-b">Code Editor</div>
                                <Editor
                                    height="100%"
                                    theme="vs-dark"
                                    language={dataIs.projectLanguage?.toLowerCase()}
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    options={{
                                        fontSize: 16,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false
                                    }}
                                />
                            </div>
                        </div>

                        {/* Input */}
                        <div>
                            <div className="bg-gray-800 rounded-xl shadow-xl h-[600px] flex flex-col border border-gray-700">
                                <div className="bg-gray-700 px-4 py-3 text-gray-300 border-b">Input</div>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter input..."
                                    className="flex-1 p-4 bg-gray-900 text-white resize-none focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Output */}
                {output && (
                    <div ref={outputRef} className="mt-6 p-4 rounded-xl bg-black text-green-400 shadow-xl">
                        <h3 className="font-bold mb-2">Output</h3>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                )}


                {/* AI Result */}
                {aiResult && aiResult !== "loading" && (
                    <div
                        ref={resultRef}
                        className="mt-8 p-6 rounded-xl bg-gray-900/80 border border-yellow-600/40 shadow-[0_0_15px_rgba(255,200,0,0.3)] animate-fadeIn"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <Brain size={22} className="text-yellow-400" />
                            <h3 className="font-bold text-xl text-yellow-300">AI Code Review</h3>
                        </div>

                        {/* Markdown Content */}
                        <div className="prose max-h-[700px] overflow-y-auto p-6 bg-white rounded-lg border border-yellow-700/30 shadow-inner space-y-4">
                            <Markdown rehypePlugins={[rehypeHighlight]}>
                                {aiResult}
                            </Markdown>
                        </div>
                    </div>
                )}



                {/* FLOATING CHAT BUTTON */}
                <button
                    onClick={handleChatBar}
                    className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl"
                >
                    <MessageSquare size={26} />
                </button>


                {/* RIGHT-SIDE CHAT PANEL */}
                <div
                    className={`fixed top-0 right-0 h-full shadow-2xl border-l border-gray-700 transition-all duration-300 z-50
    ${isChatOpen ? "w-full md:w-[50%]" : "w-0"} overflow-hidden`}
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="p-2 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition"
                        >
                            X
                        </button>
                    </div>

                    <div
                        className={`overflow-y-auto text-sm space-y-4 p-4
      ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
                        style={{ height: "calc(100% - 112px)", paddingBottom: "4rem" }}
                    >
                        {displayChat.length === 0 ? (
                            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                Ask about your code, logic, bugs, or anything…
                            </p>
                        ) : (
                            displayChat.map((curr) => (
                                <div
                                    key={curr._id}
                                    className={`p-3 rounded-lg border 
            ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
                                >
                                    <p>{new Date(curr.createdAt).toLocaleString()}</p> <br />
                                    <p className="text-blue-700 font-semibold mb-1">You:</p>
                                    <p
                                        className={`font-semibold md:text-lg whitespace-pre-line ${darkMode ? "text-yellow-300" : "text-blue-700"
                                            }`}
                                    >
                                        {curr.chat}
                                    </p>

                                    <p className="text-red-500 font-semibold mt-3 mb-1 md:text-lg">AI:</p>
                                    <div className={`md:text-[16px] whitespace-pre-wrap`}>
                                        <ReactMarkdown>{curr.response}</ReactMarkdown>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                    <div className="absolute bottom-0 w-full p-3 bg-gray-800 border-t border-gray-700">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="chat"
                                value={chat}
                                onChange={(e) => setChat(e.target.value)}
                                placeholder="Type your message…"
                                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <button
                                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center"
                                onClick={handleSendToChat}
                                disabled={chatLoader}
                            >
                                {chatLoader ? <Loader size={18} className="animate-spin text-white" /> : <Send size={20} />}
                            </button>

                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

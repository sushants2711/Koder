import React, { useState } from 'react';
import { handleError } from '../../message/error.message';
import { handleSuccess } from '../../message/success.message';
import { loginApi } from '../../api/authenticationApi';
import { allAuthConetxt } from '../../context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Code2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Helmet } from "react-helmet";

export const Login = () => {
    const { setDataOnLocalStorage } = allAuthConetxt();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorData, setErrorData] = useState({
        email: "",
        password: "",
    });

    const validateData = (name, value) => {
        switch (name) {
            case "email":
                setErrorData({
                    ...errorData,
                    email: !value.includes("@") ? "Invalid Email" : ""
                });
                break;

            case "password":
                setErrorData({
                    ...errorData,
                    password: value.length < 8 ? "Password must be at least 8 characters" : ""
                });
                break;

            default:
                setErrorData({
                    ...errorData,
                    [name]: ""
                });
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        validateData(name, value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await loginApi(loginData);
            const { success, message, error, name, email } = result;

            if (success) {
                handleSuccess(message);
                setDataOnLocalStorage(name, email);
                setLoginData({ email: "", password: "" });
                setTimeout(() => navigate("/all/projects"), 2000);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    const allValid =
        loginData.email && !errorData.email &&
        loginData.password && !errorData.password;

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-md">
                                <Code2 className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <h1 className="text-gray-900 text-xl md:text-3xl text-center mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-600 text-center text-sm md:text-lg mb-8">Sign in to continue</p>

                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                {errorData.email && <p className="text-red-600 text-sm mt-1">{errorData.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                    />
                                </div>
                                {errorData.password && <p className="text-red-600 text-sm mt-1">{errorData.password}</p>}
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-3.5 rounded-xl text-white transition-all ${allValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!allValid}
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition-colors">Sign up</Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

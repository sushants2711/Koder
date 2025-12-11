import React, { useState } from 'react';
import { handleError } from '../../message/error.message';
import { handleSuccess } from '../../message/success.message';
import { signupApi } from '../../api/authenticationApi';
import { allAuthConetxt } from '../../context/Authcontext';
import { useNavigate, Link } from 'react-router-dom';
import { Code2, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

export const Signup = () => {
    const { setDataOnLocalStorage } = allAuthConetxt();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorData, setErrorData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateData = (name, value) => {
        switch (name) {
            case "name":
                const nameRegex = /^[A-Za-z ]+$/;
                if (value.length < 5) {
                    setErrorData({ ...errorData, name: "Name must be at least 5 characters long" });
                } else if (!nameRegex.test(value)) {
                    setErrorData({ ...errorData, name: "Name can only contain letters and spaces" });
                } else {
                    setErrorData({ ...errorData, name: "" });
                }
                break;

            case "email":
                setErrorData({ ...errorData, email: !value.includes("@") ? "Invalid Email" : "" });
                break;

            case "password":
                setErrorData({ ...errorData, password: value.length < 8 ? "Password must be at least 8 characters" : "" });
                break;

            case "confirmPassword":
                setErrorData({ ...errorData, confirmPassword: value !== signupData.password ? "Passwords do not match" : "" });
                break;

            default:
                setErrorData({ ...errorData, [name]: "" });
                break;
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setSignupData({
            ...signupData,
            [name]: value
        });

        validateData(name, value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            return handleError("All fields are required");
        };

        try {
            const result = await signupApi(signupData);
            const { success, message, error, name, email } = result;

            if (success) {
                handleSuccess(message);
                setDataOnLocalStorage(name, email);
                setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
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
        signupData.name && !errorData.name &&
        signupData.email && !errorData.email &&
        signupData.password && !errorData.password &&
        signupData.confirmPassword && !errorData.confirmPassword;

    return (
        <>
            <Helmet>
                <title>SignUp</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6 py-12">
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

                        <h1 className="text-gray-900 text-xl md:text-3xl text-center mb-2 tracking-tight">Create Account</h1>
                        <p className="text-gray-600 text-center text-sm md:text-lg mb-8">Start your coding journey with AI</p>

                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={signupData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                {errorData.name && <p className="text-red-600 text-sm mt-1">{errorData.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={signupData.email}
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
                                        value={signupData.password}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                    />
                                </div>
                                {errorData.password && <p className="text-red-600 text-sm mt-1">{errorData.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={signupData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                    />
                                </div>
                                {errorData.confirmPassword && <p className="text-red-600 text-sm mt-1">{errorData.confirmPassword}</p>}
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500" required />
                                <span className="text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                            </label>

                            <button
                                type="submit"
                                className={`w-full py-3.5 rounded-xl text-white transition-all ${allValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!allValid}
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600">Already have an account? </span>
                            <Link to="/login" className="text-blue-500 hover:text-blue-600 transition-colors">Login</Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

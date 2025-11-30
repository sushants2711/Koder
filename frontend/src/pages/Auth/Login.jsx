import React, { useState } from 'react';
import { handleError } from '../../message/error.message';
import { handleSuccess } from '../../message/success.message';
import { loginApi } from '../../api/authenticationApi';
import { allAuthConetxt } from '../../context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
        };
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData({
            ...loginData,
            [name]: value
        })

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
                setLoginData({
                    email: "",
                    password: "",
                });
                setTimeout(() => navigate("/"), 3000);
            }
            else if (!success) {
                handleError(message);
            }
            else {
                handleError(error)
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    const allValid =
        loginData.email && !errorData.email &&
        loginData.password && !errorData.password;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleFormSubmit}>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={loginData.email}
                        />
                        {errorData.email && <p className="text-red-600 text-sm mt-1">{errorData.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            id="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={loginData.password}
                        />
                        {errorData.password && <p className="text-red-600 text-sm mt-1">{errorData.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg text-white transition-all ${allValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!allValid}>
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

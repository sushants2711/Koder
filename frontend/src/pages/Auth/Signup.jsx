import React, { useState } from 'react';
import { handleError } from '../../message/error.message';
import { handleSuccess } from '../../message/success.message';
import { signupApi } from '../../api/authenticationApi';
import { allAuthConetxt } from '../../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                    setErrorData({
                        ...errorData,
                        name: "Name must be at least 5 characters long"
                    });
                } else if (!nameRegex.test(value)) {
                    setErrorData({
                        ...errorData,
                        name: "Name can only contain letters and spaces"
                    });
                } else {
                    setErrorData({
                        ...errorData,
                        name: ""
                    });
                };
                break;

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

            case "confirmPassword":
                setErrorData({
                    ...errorData,
                    confirmPassword: value !== signupData.password ? "Passwords do not match" : ""
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

        try {
            const result = await signupApi(signupData);
            const { success, message, error, name, email } = result;

            if (success) {
                handleSuccess(message);
                setDataOnLocalStorage(name, email);
                setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
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
        signupData.name && !errorData.name &&
        signupData.email && !errorData.email &&
        signupData.password && !errorData.password &&
        signupData.confirmPassword && !errorData.confirmPassword;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name='name'
                            id="name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            value={signupData.name}
                        />
                        {errorData.name && <p className="text-red-600 text-sm mt-1">{errorData.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                        {errorData.password && <p className="text-red-600 text-sm mt-1">{errorData.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name='confirmPassword'
                            id="confirmPassword"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            value={signupData.confirmPassword}
                        />
                        {errorData.confirmPassword && <p className="text-red-600 text-sm mt-1">{errorData.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg text-white transition-all ${allValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!allValid}>
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

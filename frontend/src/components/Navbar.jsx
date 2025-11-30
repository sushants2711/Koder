import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import images from "../assets/images.png";
import { Plus, Menu, Hammer } from "lucide-react";
import { logoutApi } from "../api/authenticationApi";
import { handleSuccess } from "../message/success.message";
import { handleError } from "../message/error.message";
import { ToastContainer } from "react-toastify";
import { allAuthConetxt } from "../context/Authcontext";


export const Navbar = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { userName, fetchDataFromLocalStorage, deleteDataFromLocalStorage } = allAuthConetxt();

    const handleLogout = async () => {
        try {
            const result = await logoutApi();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                deleteDataFromLocalStorage();
                setTimeout(() => {
                    navigate("/logout");
                }, 1000);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    const handleClick = () => {
        navigate("/create-project");
    };

    useEffect(() => {
        fetchDataFromLocalStorage();
    }, [handleLogout])

    return (
        <>
            <nav className="bg-black text-white border-b-2 border-white">
                {/* Desktop Navbar */}
                <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center px-10 py-4">
                    {/* Logo */}
                    <div>
                        <img src={images} alt="logo" className="h-8" />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-10">
                        <NavLink
                            to="/"
                            className="border-b-2 border-transparent hover:border-white transition-all"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/all/project"
                            className="border-b-2 border-transparent hover:border-white transition-all"
                        >
                            Project
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="border-b-2 border-transparent hover:border-white transition-all"
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="border-b-2 border-transparent hover:border-white transition-all"
                        >
                            Contact
                        </NavLink>
                    </div>


                    {!userName ? (
                        <div className="flex gap-10">
                            <NavLink
                                to="/login"
                                className="border-b-2 hover:border-white bg-emerald-500 hover:bg-emerald-700 text-white px-6 py-2 rounded-sm transition-all"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="border-b-2 hover:border-white transition-all bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-sm "
                            >
                                Signup
                            </NavLink>
                        </div>
                    ) : (
                        <div className="flex gap-10">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-sm transition-all"
                                onClick={handleClick}
                            >
                                Project <Plus className="w-5 h-5" />
                            </button>

                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-sm transition-all"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center justify-between px-5 py-4 md:hidden">
                    <img src={images} alt="logo" className="h-7" />
                    <button onClick={() => setOpen(!open)}>
                        {open ? <Hammer size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {open && (
                    <div className="md:hidden bg-black text-white px-5 py-4 space-y-5 animate-slideDown flex flex-col items-center">
                        <NavLink
                            to="/"
                            className="block text-lg hover:text-white transition"
                            onClick={() => setOpen(false)}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/all/project"
                            className="block text-lg hover:text-white transition"
                            onClick={() => setOpen(false)}
                        >
                            Project
                        </NavLink>

                        <NavLink
                            to="/about"
                            className="block text-lg hover:text-white transition"
                            onClick={() => setOpen(false)}
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className="block text-lg hover:text-white transition"
                            onClick={() => setOpen(false)}
                        >
                            Contact
                        </NavLink>

                        {!userName && <>
                            <NavLink
                                to="/login"
                                className="block text-lg hover:text-white transition"
                                onClick={() => setOpen(false)}>
                                Login
                            </NavLink>

                            <NavLink
                                to="/signup"
                                className="block text-lg hover:text-white transition"
                                onClick={() => setOpen(false)}>
                                Signup
                            </NavLink>
                        </>
                        }

                        {userName && <>
                            <div className="pt-4 border-t border-gray-700">
                                <button className="flex items-center gap-2 text-lg  bg-blue-600 hover:bg-blue-800 text-white px-16 py-2 rounded transition-all"
                                    onClick={handleClick}
                                >
                                    <Plus className="w-5 h-5" /> Project
                                </button>

                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white w-full mt-4 py-2 rounded transition-all"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                        }
                    </div>
                )}

                <ToastContainer />
            </nav>
        </>
    );
};

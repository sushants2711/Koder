import React, { useEffect, useState } from "react";
import { getProjectByIdApi, updateProjectNameApi } from "../../api/projectApi";
import { handleError } from "../../message/error.message";
import { handleSuccess } from "../../message/success.message";

export const UpdateProjectName = ({ id, close, refresh }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const regex = /^[A-Za-z0-9_]+$/;

    const handleChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (value.length < 3) {
            setError("Name must be at least 3 characters");
        } else if (!regex.test(value)) {
            setError("Only letters, numbers, and underscore (_) allowed");
        } else {
            setError("");
        }
    };


    const getProjectById = async () => {
        try {
            const result = await getProjectByIdApi(id);
            const { success, data } = result;

            if (success) {
                setName(data.name);
            };
        } catch (error) {
            console.log(error.message);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await updateProjectNameApi(id, { name });
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                refresh();
                close();
            } else {
                handleError(message || error);
            }
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        getProjectById();
    }, [id]);

    const isValid = name.length >= 3 && regex.test(name);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
                    Update Project Name
                </h2>

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-gray-700 font-medium">
                        New Project Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter new project name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {error && (
                        <p className="text-red-600 text-sm mt-2">{error}</p>
                    )}

                    <div className="flex justify-between gap-3 mt-5">
                        <button
                            type="button"
                            onClick={close}
                            className="w-1/2 py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-1/2 py-2 rounded-lg text-white transition 
                                ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
                            `}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

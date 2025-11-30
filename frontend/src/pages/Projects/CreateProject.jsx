import React, { useState } from "react";
import projectImage from "../../assets/projectImage.jpg";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../message/error.message";
import { createProjectApi } from "../../api/projectApi";
import { handleSuccess } from "../../message/success.message";

export const CreateProject = () => {
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        name: "",
        projectLanguage: "",
    });

    const [projectError, setProjectError] = useState({
        name: "",
        projectLanguage: "",
    });

    const [errorIs, setErrorIs] = useState(null);
    const [successIs, setSuccessIs] = useState(null);

    const validateData = (name, value) => {
        switch (name) {
            case "name":
                const regex = /^[A-Za-z0-9_]+$/;
                if (value.length < 3) {
                    setProjectError({
                        ...projectError,
                        name: "Project name must be at least 3 characters",
                    });
                } else if (!regex.test(value)) {
                    setProjectError({
                        ...projectError,
                        name: "Only letters, numbers, underscore allowed",
                    });
                } else {
                    setProjectError({
                        ...projectError,
                        name: "",
                    });
                }
                break;

            case "projectLanguage":
                setProjectError({
                    ...projectError,
                    projectLanguage: value === "" ? "Please select a language" : "",
                });
                break;

            default:
                setProjectError({
                    ...projectError,
                    [name]: "",
                });
                break;
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProjectData({
            ...projectData,
            [name]: value,
        });

        validateData(name, value);
    };

    const handleNewProject = async (e) => {
        e.preventDefault();

        try {
            const result = await createProjectApi(projectData);
            const { success, message, data, error } = result;
            const { _id } = data;
            if (success) {
                handleSuccess(message);
                setSuccessIs(message);
                setErrorIs(null);
                setProjectData({
                    name: "",
                    projectLanguage: ""
                });

                setTimeout(() => {
                    navigate(`/editor/${_id}`);
                }, 2000);
            } else if (!success) {
                handleError(message);
                setErrorIs(message);
                setSuccessIs(null);
            } else {
                handleError(error);
                setErrorIs(error);
                setSuccessIs(null);
            };
        } catch (error) {
            handleError(error.message);
        }
    };

    const allValid =
        !projectError.name &&
        !projectError.projectLanguage &&
        projectData.name &&
        projectData.projectLanguage;


    return (
        <main className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
                {/* Optional Illustration */}
                <div className="flex justify-center mb-4">
                    <img src={projectImage} alt="create" className="" />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-8 text-gray-800 inline-block border-b-2 border-black">
                        Create New Project
                    </h1>
                </div>

                <form onSubmit={handleNewProject} className="space-y-4">
                    {/* Project Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Project Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter project name"
                            onChange={handleChange}
                            value={projectData.name}
                            className={`border px-3 py-2 rounded-lg focus:ring-2 outline-none text-sm ${projectError.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                        {projectError.name && (
                            <p className="text-red-500 text-xs mt-1">{projectError.name}</p>
                        )}
                    </div>

                    {/* Project Language */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            Choose Your Language
                        </label>
                        <select
                            name="projectLanguage"
                            onChange={handleChange}
                            value={projectData.projectLanguage}
                            className={`border px-3 py-2 rounded-lg focus:ring-2 outline-none text-sm ${projectError.projectLanguage
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                        >
                            <option value="" disabled>
                                Select Language
                            </option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="Cpp">C++</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="C">C</option>
                            <option value="go">Go</option>
                            <option value="bash">Bash</option>
                        </select>
                        {projectError.projectLanguage && (
                            <p className="text-red-500 text-xs mt-1">
                                {projectError.projectLanguage}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!allValid}
                        className={`w-full py-2 rounded-lg text-sm text-white transition ${allValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Create
                    </button>

                    <div className="mt-2 text-center">
                        {errorIs && <p className="text-red-500 text-sm">{errorIs}</p>}
                        {successIs && <p className="text-green-500 text-sm">{successIs}</p>}
                    </div>
                </form>
            </div>
        </main>
    );
};

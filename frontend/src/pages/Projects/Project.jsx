import React, { useEffect, useState } from 'react';
import { allProjectApi, deleteProjectApi } from '../../api/projectApi';
import { handleError } from '../../message/error.message';
import { useNavigate } from 'react-router-dom';
import { allAuthConetxt } from '../../context/Authcontext';
import { Pencil, Hammer } from 'lucide-react';
import { handleSuccess } from '../../message/success.message';
import { ToastContainer } from 'react-toastify';
import { UpdateProjectName } from './UpdateProjectName';

const languageLogos = {
    Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    Cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
};

export const Project = () => {
    const navigate = useNavigate();
    const { userName } = allAuthConetxt();

    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [updateProject, setUpdateProject] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchAllProject = async () => {
        setLoading(true);
        try {
            const result = await allProjectApi();
            const { success, message, error, data } = result;

            if (success) {
                setProjectData(data);
            } else if (!success) {
                // handleError(message);
            } else {
                // handleError(error);
            };
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProject();
    }, []);

    const handleNavigate = (id) => {
        // const encode = btoa(id);
        navigate(`/editor/${id}`);
    };

    const handleEdit = (id) => {
        setSelectedId(id);
        setUpdateProject(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            const result = await deleteProjectApi(id);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                fetchAllProject();
            } else {
                handleError(message || error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <>
            {updateProject && (
                <UpdateProjectName
                    id={selectedId}
                    close={() => setUpdateProject(false)}
                    refresh={fetchAllProject}
                />
            )}

            <main className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
                    All Projects by{' '}
                    <span className="text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition">
                        {userName || "User"}
                    </span>
                </h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading projects...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {projectData.length === 0 ? (
                            <p className="text-center text-gray-500 col-span-full">
                                Kickstart your first project to see it here!
                            </p>
                        ) : (
                            projectData.map((project) => (
                                <div
                                    key={project._id}
                                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition cursor-pointer"
                                    onClick={() => handleNavigate(project._id)}
                                >
                                    <img
                                        src={languageLogos[project.projectLanguage]}
                                        alt={project.projectLanguage}
                                        className="w-16 h-16 mb-4"
                                    />

                                    <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                                        {project.name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mb-4">{project.projectLanguage}</p>

                                    <p className="text-xs text-gray-400">
                                        Created: {new Date(project.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="w-full flex justify-end mt-4 gap-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(project._id);
                                            }}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(project._id);
                                            }}
                                        >
                                            <Hammer size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                <ToastContainer />
            </main>
        </>
    );
};

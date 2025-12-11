import React, { useEffect, useState } from 'react';
import { allProjectApi, deleteProjectApi } from '../../api/projectApi';
import { handleError } from '../../message/error.message';
import { Link, useNavigate } from 'react-router-dom';
import { allAuthConetxt } from '../../context/Authcontext';
import { Pencil, Hammer, Code2, LogOut, Plus, Search, FolderCode, Clock } from 'lucide-react';
import { handleSuccess } from '../../message/success.message';
import { ToastContainer } from 'react-toastify';
import { UpdateProjectName } from './UpdateProjectName';
import { logoutApi } from '../../api/authenticationApi';
import { CreateProject } from './CreateProject';
import { Helmet } from 'react-helmet';



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
    const { userName, deleteDataFromLocalStorage } = allAuthConetxt();

    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [updateProject, setUpdateProject] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [newProject, setNewProject] = useState(false);

    const name = localStorage.getItem("name");


    const filteredProjects = projectData.filter(
        (project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    }

    const createNewProject = () => {
        setNewProject(true);
    };

    return (
        <>
            <Helmet>
                <title>
                    Project
                </title>
            </Helmet>

            {updateProject && (
                <UpdateProjectName
                    id={selectedId}
                    close={() => setUpdateProject(false)}
                    refresh={fetchAllProject}
                />
            )}

            {
                newProject && <CreateProject close={() => setNewProject(false)} refresh={fetchAllProject} />
            }

            {/* <main className="max-w-7xl mx-auto px-4 py-10">
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
            </main> */}


            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-gray-900 text-xl hidden md:block">CodeAI Studio</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                        <div className='text-center md:text-left'>
                            <h1 className="text-gray-900 text-4xl mb-2 tracking-tight">My Projects</h1>
                            <p className="text-gray-600">
                                Manage and organize coding projects by <span className='text-blue-600 text-xl'>{name || "User"}</span>
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                            onClick={createNewProject}
                        >
                            <Plus className="w-5 h-5" />
                            New Project
                        </button>
                    </div>


                    {/* Search Bar */}
                    <div className="mb-12 mt-20">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <img
                                            src={languageLogos[project.projectLanguage]}
                                            alt={project.projectLanguage}
                                            className="w-26 h-26"
                                        />
                                    </div>

                                    {/* Delete and Edit Buttons */}
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg transition" onClick={() => handleEdit(project._id)}>
                                            <Pencil size={18} />
                                        </button>
                                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition" onClick={() => handleDelete(project._id)}>
                                            <Hammer size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-gray-900 text-xl mb-2">{project.name}</h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-gray-600 capitalize">{project.language}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <Link
                                        to={`/editor/${project._id}`}
                                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        Open
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <FolderCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No projects found</p>
                        </div>
                    )}
                </main>
            </div>
            <ToastContainer />

        </>
    );
};

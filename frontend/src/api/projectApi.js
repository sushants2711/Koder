import { BACKEND_BASEURL } from "./BaseUrl";
import axios from "axios";

// CREATE PROJECT
export const createProjectApi = async (data) => {
    try {
        const url = BACKEND_BASEURL + "/api/v1/project/create-project";
        const response = await axios.post(url, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

// GET ALL PROJECTS
export const allProjectApi = async () => {
    try {
        const url = BACKEND_BASEURL + "/api/v1/project/all";
        const response = await axios.get(url, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

// DELETE PROJECT
export const deleteProjectApi = async (id) => {
    try {
        const url = BACKEND_BASEURL + `/api/v1/project/project-delete/${id}`;
        const response = await axios.delete(url, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

// UPDATE PROJECT NAME
export const updateProjectNameApi = async (id, data) => {
    try {
        const url = BACKEND_BASEURL + `/api/v1/project/project-update/name/${id}`;
        const response = await axios.put(url, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

// GET PROJECT BY ID
export const getProjectByIdApi = async (id) => {
    try {
        const url = BACKEND_BASEURL + `/api/v1/project/all/${id}`;
        const response = await axios.get(url, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

// UPDATE CODE
export const updateCodeApi = async (id, code) => {
    try {
        const url = `${BACKEND_BASEURL}/api/v1/project/update-code/${id}`;
        const response = await axios.put(url, code, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
    }
};

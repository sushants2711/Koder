import { BACKEND_BASEURL } from "./BaseUrl";

export const signupApi = async (data) => {
    try {
        const url = BACKEND_BASEURL + "/api/v1/auth/signup";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};

export const loginApi = async (data) => {
    try {
        const url = BACKEND_BASEURL + "/api/v1/auth/login";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};

export const logoutApi = async () => {
    try {
        const url = BACKEND_BASEURL + "/api/v1/auth/logout";

        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};
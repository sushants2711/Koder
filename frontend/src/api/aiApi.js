import axios from "axios";
import { BACKEND_BASEURL } from "./BaseUrl";

export const aiCodeCheckerApi = async (data) => {
    try {
        const url = `${BACKEND_BASEURL}/api/v1/gemni/code-review`;
        const response = await axios.post(url, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server Error");
        } else {
            throw new Error(error.message);
        }
    }
};

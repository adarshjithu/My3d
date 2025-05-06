import { store } from "@/Store/store";
import axios from "axios";
import { userLogout } from "./userServices";
import { logoutUser } from "@/fetures/user/authSlice";

export const errorHandler = (error: any) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response && axiosError.response?.data && axiosError?.response?.data?.message) {
            return Promise.reject(axiosError?.response?.data?.message);
        }
    }

    return Promise.reject("An unexpected error occured");
};

const baseURL = "http://localhost:3000";
const API = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const refreshAccessToken = async () => {
    try {
        // Call the refresh endpoint
        const response = await API.post(
            "api/refresh_token",
            {},
            {
                withCredentials: true, // Ensure cookies are sent
            }
        );

        // The server should handle sending back the new access token via cookies
        return response.data.access_token; // Adjust based on your server response
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

API.interceptors.response.use(
    (response: any) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        //checking refresh token for user
        if (error.response.data?.message == "Refresh Token Expired") {
            store.dispatch(logoutUser());
            window.location.href = "/";
        }

        //checking error for refreshtoken
        if (error.response.data.message == "Access Token Expired" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAccessToken();
                return API(originalRequest);
            } catch (refreshError) {
                store.dispatch(logoutUser());

                window.location.href = "/"; // Redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;

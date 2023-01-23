import { HttpError } from "@pankod/refine-core";

// "axios" package should be installed to customize the http client
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.common[
    "Authorization"
] = `Bearer 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`;

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

export { axiosInstance };

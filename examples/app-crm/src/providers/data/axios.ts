import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { refreshTokens, shouldRefreshToken } from "./refresh-token";

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json, text/plain, */*",
        "Apollo-Require-Preflight": "true",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken && config?.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    async (response) => {
        convertAxiosToFetchResponse(response);

        const data = response?.data;
        const errors = data?.errors;
        const originalRequest = response.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        if (errors) {
            if (shouldRefreshToken(response) && !originalRequest?._retry) {
                const tokens = await refreshTokens();
                if (!tokens) throw errors;

                originalRequest._retry = true;
                return axiosInstance(originalRequest);
            }

            SetResponseOk(response, false);
            throw errors;
        }

        return response;
    },
    (error) => {
        SetResponseOk(error, false);
        return Promise.reject(error);
    },
);

const convertAxiosToFetchResponse = (response: AxiosResponse) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.headers["forEach"] = function (callback: any) {
        for (const header in this) {
            if (this.hasOwnProperty(header)) {
                callback(this[header], header, this);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response["text"] = async function () {
        return JSON.stringify(this.data);
    };
    SetResponseOk(response, true);
};

const SetResponseOk = (response: AxiosResponse, ok: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response["ok"] = ok;
};

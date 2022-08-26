import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosRequestHeaders,
} from "axios";
import createAuthRefreshInterceptor, {
    AxiosAuthRefreshRequestConfig,
} from "axios-auth-refresh";

import { Auth, Log, DraftResource, Config, CloudQuery } from "./services";

class Client {
    private baseUrl: string;
    private clientId: string;
    private clientSecret?: string;

    constructor(payload: {
        baseUrl: string;
        clientId: string;
        clientSecret?: string;
    }) {
        const { baseUrl, clientId, clientSecret } = payload;

        this.baseUrl = baseUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        // refresh token
        const refreshAuthLogic = async () => {
            const refreshToken = this.getLocalStorage(
                "refine-sdk-refresh-token",
            );
            if (refreshToken) {
                return await axios.post(`${this.baseUrl}/auth/refresh-token`, {
                    applicationClientId: this.clientId,
                    refreshToken,
                });
            }

            return;
        };

        createAuthRefreshInterceptor(axios, refreshAuthLogic);

        // axios response interceptor
        axios.interceptors.response.use((response: AxiosResponse) => {
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;

            if (response.status === 200 && accessToken && refreshToken) {
                this.setLocalStorage("refine-sdk-access-token", accessToken);
                this.setLocalStorage("refine-sdk-refresh-token", refreshToken);
            }

            return response;
        });

        // axios request interceptor
        axios.interceptors.request.use((config: AxiosRequestConfig) => {
            const accessToken = this.getLocalStorage("refine-sdk-access-token");

            if (config && config.headers && accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }

            return config;
        });
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    getClientId(): string {
        return this.clientId;
    }

    getClientSecret(): string | undefined {
        return this.clientSecret;
    }

    getRefineCloudToken(): string | undefined {
        const key = `refine-cloud-token`;

        if (!this.isBrowser) {
            console.warn(`"${key}" is only available in browser`);
        }

        const token = window.localStorage.getItem(key);

        if (!token) {
            console.warn(`"${key}" is not set in localStorage`);
            return;
        }

        return token;
    }

    private isBrowser() {
        return typeof window !== "undefined";
    }

    private setLocalStorage(key: string, value: string) {
        if (this.isBrowser()) {
            return window.localStorage.setItem(key, value);
        }

        return false;
    }

    private getLocalStorage(key: string) {
        if (this.isBrowser()) {
            return window.localStorage.getItem(key);
        }

        return false;
    }

    get auth(): Auth {
        return new Auth(this);
    }

    get log(): Log {
        return new Log(this);
    }

    get draftResource(): DraftResource {
        return new DraftResource(this);
    }

    get config(): Config {
        return new Config(this);
    }

    get cloudQuery(): CloudQuery {
        return new CloudQuery(this);
    }

    async call<D>(payload: {
        method:
            | "get"
            | "delete"
            | "head"
            | "options"
            | "post"
            | "put"
            | "patch";
        url: string;
        params?: any;
        data?: any;
        skipAuthRefresh?: boolean;
        headers?: AxiosRequestHeaders;
    }): Promise<D> {
        const { params, method, url, skipAuthRefresh, headers } = payload;
        let { data } = payload;

        data = {
            ...data,
            applicationClientId: this.clientId,
        };

        const config: AxiosAuthRefreshRequestConfig = {
            baseURL: this.baseUrl,
            method,
            url,
            params,
            data,
            skipAuthRefresh,
            headers,
        };

        return axios({
            ...config,
        })
            .then((response) => response.data)
            .catch((error: AxiosError) => {
                if (error.response) {
                    throw new Error(error.response.data.message);
                }

                throw new Error("An unknown error occurred");
            });
    }
}

export { Client };

import axios, { AxiosInstance } from "axios";
import { DataProvider, HttpError } from "@pankod/refine";
import { stringify } from "query-string";

const axiosInstance = axios.create();

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

const Strapi = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { pagination, sort } = params;

        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const _sort = [];
        if (Array.isArray(sort) || sort?.field) {
            if (Array.isArray(sort)) {
                sort.map((item) => {
                    if (item.order) {
                        const order = item.order.replace("end", "");
                        _sort.push(`${item.field}:${order}`);
                    }
                });
            } else {
                if (sort.order) {
                    const order = sort.order.replace("end", "");
                    _sort.push(`${sort.field}:${order}`);
                }
            }
        }

        // filter
        const filters = stringify(params.filters || {}, {
            skipNull: true,
        });

        const query = {
            _start: (current - 1) * pageSize,
            _limit: current * pageSize,
            _sort: _sort.length > 0 ? _sort.join(",") : undefined,
        };

        const { data } = await httpClient.get(
            `${url}?${stringify(query)}&${filters}`,
        );

        const countRequest = await httpClient.get(`${url}/count`);

        return {
            data: data,
            total: countRequest.data,
        };
    },

    getMany: async (resource, ids) => {
        const url = `${apiUrl}/${resource}`;

        const query = "";

        const { data } = await httpClient.get(`${url}?${query}`);

        return {
            data,
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, params);

        return {
            data,
        };
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, params);

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`,
                    params,
                );
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}/bulk`;

        const { data } = await httpClient.post(url, { bulk: params });

        return {
            data,
        };
    },

    getOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },

    deleteOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },

    deleteMany: async (resource, ids) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
                );
                return data;
            }),
        );
        return { data: response };
    },

    getApiUrl: () => {
        return apiUrl;
    },
});

export default Strapi;

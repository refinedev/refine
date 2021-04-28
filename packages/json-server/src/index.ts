import axios, { AxiosInstance } from "axios";
import { stringify } from "query-string";
import { DataProvider, HttpError } from "@pankod/refine";

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

const JsonServer = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        // search
        const q = params.search?.value;

        // pagination
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        // sort
        let _sort = ["id"]; // default sorting field
        let _order = ["desc"]; // default sorting

        const { sort } = params;

        if (Array.isArray(sort) || sort?.field) {
            _sort = [];
            _order = [];

            if (Array.isArray(sort)) {
                sort.map((item) => {
                    _sort.push(`${item.field}`);
                    _order.push(`${item.order}`.replace("end", "")); // replace -> [ascend, descend] -> [asc,desc]
                });
            } else {
                _sort.push(`${sort.field}`);
                _order.push(`${sort.order}`.replace("end", "")); // replace -> [ascend, descend] -> [asc,desc]
            }
        }

        // filter
        const filters = stringify(params.filters || {}, {
            skipNull: true,
        });

        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
            _sort: _sort.join(","),
            _order: _order.join(","),
            q,
        };

        const { data, headers } = await httpClient.get(
            `${url}?${stringify(query)}&${filters}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    getMany: async (resource, ids) => {
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

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

    createMany: async (resource, paramsList) => {
        throw new Error("createMany not implemented");
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.put(url, params);

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.put(
                    `${apiUrl}/${resource}/${id}`,
                    params,
                );
                return data;
            }),
        );

        return { data: response };
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

export default JsonServer;

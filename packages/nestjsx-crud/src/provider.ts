import { AxiosInstance } from "axios";
import { RequestQueryBuilder, CondOperator } from "@nestjsx/crud-request";
import { DataProvider } from "@refinedev/core";
import { stringify } from "query-string";
import {
    handleFilter,
    handlePagination,
    handleSort,
    handleJoin,
    axiosInstance,
} from "./utils";

export const dataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): Required<DataProvider> => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const url = `${apiUrl}/${resource}`;

        let query = RequestQueryBuilder.create();

        query = handleFilter(query, filters);
        query = handleJoin(query, meta?.join);
        query = handlePagination(query, pagination);
        query = handleSort(query, sorters);

        const { data } = await httpClient.get(`${url}?${query.query()}`);

        return {
            data: data.data,
            total: data.total,
        };
    },

    getMany: async ({ resource, ids, meta }) => {
        const url = `${apiUrl}/${resource}`;

        let query = RequestQueryBuilder.create().setFilter({
            field: "id",
            operator: CondOperator.IN,
            value: ids,
        });

        query = handleJoin(query, meta?.join);

        const { data } = await httpClient.get(`${url}?${query.query()}`);

        return {
            data,
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, variables);

        return {
            data,
        };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, variables);

        return {
            data,
        };
    },

    updateMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`,
                    variables,
                );
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}/bulk`;

        const { data } = await httpClient.post(url, { bulk: variables });

        return {
            data,
        };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },

    deleteOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },

    deleteMany: async ({ resource, ids }) => {
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

    custom: async ({
        url,
        method,
        meta,
        filters,
        sorters,
        payload,
        query,
        headers,
    }) => {
        let requestQueryBuilder = RequestQueryBuilder.create();

        requestQueryBuilder = handleFilter(requestQueryBuilder, filters);

        requestQueryBuilder = handleJoin(requestQueryBuilder, meta?.join);

        requestQueryBuilder = handleSort(requestQueryBuilder, sorters);

        let requestUrl = `${url}?${requestQueryBuilder.query()}`;

        if (query) {
            requestUrl = `${requestUrl}&${stringify(query)}`;
        }

        if (headers) {
            httpClient.defaults.headers = {
                ...httpClient.defaults.headers,
                ...headers,
            };
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = await httpClient[method](url, payload);
                break;
            case "delete":
                axiosResponse = await httpClient.delete(url, {
                    data: payload,
                });
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
});

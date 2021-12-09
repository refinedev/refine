import axios, { AxiosInstance } from "axios";
import {
    DataProvider as IDataProvider,
    HttpError,
    CrudFilters,
    CrudSorting,
} from "@pankod/refine";
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

const generateSort = (sort?: CrudSorting) => {
    const _sort: string[] = [];

    if (sort) {
        sort.map((item) => {
            if (item.order) {
                _sort.push(`${item.field}:${item.order}`);
            }
        });
    }

    return _sort;
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map(({ field, operator, value }) => {
            queryFilters[`filters[${field}][$${operator}]`] = value;
        });
    }

    return queryFilters;
};

const normalizeData = (data: any) => {
    const _data = data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
    }));

    return _data;
};

export const DataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): IDataProvider => ({
    getList: async ({ resource, pagination, filters, sort, metaData }) => {
        const url = `${apiUrl}/${resource}`;

        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        const locale = metaData?.locale;
        const fields = metaData?.fields;
        const populate = metaData?.populate;
        const publicationState = metaData?.publicationState;

        const quertSorters = generateSort(sort);
        const queryFilters = generateFilter(filters);

        const query = {
            "pagination[page]": current,
            "pagination[pageSize]": pageSize,
            locale,
            fields,
            populate,
            publicationState,
            sort: quertSorters.length > 0 ? quertSorters.join(",") : undefined,
        };

        const { data } = await httpClient.get(
            `${url}?${stringify(query, { encode: false })}&${stringify(
                queryFilters,
                { encode: false },
            )}`,
        );

        return {
            data: normalizeData(data),
            total: data.meta.pagination.total,
        };
    },

    getMany: async ({ resource, ids }) => {
        const url = `${apiUrl}/${resource}`;

        const query = ids
            .map((item: string) => `filters[id][$in]=${item}`)
            .join("&");

        const { data } = await httpClient.get(`${url}?${query}`);

        return {
            data: normalizeData(data),
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

        const { data } = await httpClient.put(url, variables);

        return {
            data,
        };
    },

    updateMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.put(
                    `${apiUrl}/${resource}/${id}`,
                    variables,
                );
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async () => {
        throw new Error("createMany not implemented");
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

    custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const sortQuery = generateSort(sort);
            if (sortQuery.length > 0) {
                requestUrl = `${requestUrl}&${stringify({
                    _sort: sortQuery.join(","),
                })}`;
            }
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
        }

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
                axiosResponse = await httpClient.delete(url);
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
});

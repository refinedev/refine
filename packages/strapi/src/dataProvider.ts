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

// hack for media upload
const mediaUploadMapper = (params: any) => {
    Object.keys(params).map((item) => {
        const param = params[item];
        const isMediaField = Array.isArray(param) && param[0]["uid"];
        if (isMediaField) {
            params[item] = param.map((item: any) => item.uid);
        }
    });
    return params;
};

export const StrapiDataProvider = (
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

        const query = ids
            .map((item: string | number) => `id_in=${item}`)
            .join("&");

        const { data } = await httpClient.get(`${url}?${query}`);

        return {
            data,
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, mediaUploadMapper(params));

        return {
            data,
        };
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.put(url, mediaUploadMapper(params));

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.put(
                    `${apiUrl}/${resource}/${id}`,
                    mediaUploadMapper(params),
                );
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async () => {
        throw new Error("createMany not implemented");
    },

    getOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        Object.keys(data).map((item) => {
            const isMediaField =
                data[item] &&
                data[item]["id"] &&
                data[item]["width"] &&
                data[item]["url"];

            if (isMediaField) {
                data[item] = [
                    {
                        name: data[item].name,
                        percent: 100,
                        size: data[item].size,
                        status: "done",
                        type: data[item].mime,
                        uid: data[item].id,
                        // TODO: fix api url
                        url: `https://refine-strapi.pankod.com${data[item].url}`,
                    },
                ];
            }
        });

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

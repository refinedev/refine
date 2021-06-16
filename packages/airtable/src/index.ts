import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilters,
} from "@pankod/refine";
import { CrudSorting } from "@pankod/refine/dist/interfaces";
import { AirtableBase } from "airtable/lib/airtable_base";

/* const axiosInstance = axios.create();

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
); */

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
    }

    return ""; // default "eq"
};

const generateSort = (sort?: CrudSorting) => {
    return sort?.map((item) => ({
        field: item.field,
        direction: item.order,
    }));
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map(({ field, operator, value }) => {
            const mappedOperator = mapOperator(operator);
            queryFilters[`${field}${mappedOperator}`] = value;
        });
    }

    return queryFilters;
};

const AirtableDataProvider = (
    apiUrl: string,
    airtableClient: AirtableBase,
): DataProvider => ({
    getList: async (resource, params) => {
        console.log(resource, params);
        // pagination
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        const sort = generateSort(params.sort);

        const queryFilters = generateFilter(params.filters);

        const { all } = airtableClient(resource).select({
            pageSize: 100,
            sort,
        });

        const data = await all();

        return {
            data: data
                .slice((current - 1) * pageSize, current * pageSize)
                .map((p) => p.fields) as any,
            total: data.length,
        };
    },

    getMany: async (resource, ids) => {
        throw Error("not implemented");
        /* const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

        return {
            data,
        }; */
    },

    create: async (resource, params) => {
        const { save } = await airtableClient(resource).create(params);

        /*  const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, params);

        return {
            data,
        }; */
    },

    createMany: async (resource, params) => {
        throw Error("not implemented");

        /*   const response = await Promise.all(
            params.map(async (param) => {
                const { data } = await httpClient.post(
                    `${apiUrl}/${resource}`,
                    param,
                );
                return data;
            }),
        );

        return { data: response }; */
    },

    update: async (resource, id, params) => {
        throw Error("not implemented");

        /*  const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, params);

        return {
            data,
        }; */
    },

    updateMany: async (resource, ids, params) => {
        throw Error("not implemented");

        /*  const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`,
                    params,
                );
                return data;
            }),
        );

        return { data: response }; */
    },

    getOne: async (resource, id) => {
        throw Error("not implemented");

        /*  const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        }; */
    },

    deleteOne: async (resource, id) => {
        throw Error("not implemented");

        /*  const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        }; */
    },

    deleteMany: async (resource, ids) => {
        throw Error("not implemented");

        /* const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
                );
                return data;
            }),
        );
        return { data: response }; */
    },

    getApiUrl: () => {
        return apiUrl;
    },

    custom: async (url, method, params = {}) => {
        throw Error("not implemented");
    },
});

export default AirtableDataProvider;

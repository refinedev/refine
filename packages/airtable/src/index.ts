import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilters,
} from "@pankod/refine";
import { BaseRecord, CrudSorting } from "@pankod/refine/dist/interfaces";
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
    },

    create: async (resource, params) => {
        const { fields } = await airtableClient<any>(resource).create(params);

        return {
            data: fields,
        };
    },

    createMany: async (resource, params) => {
        const data = await airtableClient<any>(resource).create(params);

        return {
            data: data as any,
        };
    },

    update: async (resource, id, params) => {
        const data = await airtableClient<any>(resource).update(id, params);

        return {
            data: data as any,
        };
    },

    updateMany: async (resource, ids, params) => {
        const requestParams = ids.map((id) => ({
            id,
            fields: { ...params },
        }));
        const data = await airtableClient<any>(resource).update(requestParams);

        return {
            data: data as any,
        };
    },

    getOne: async (resource, id) => {
        const { fields } = await airtableClient<any>(resource).find(id);

        return {
            data: fields,
        };
    },

    deleteOne: async (resource, id) => {
        const { fields } = await airtableClient<any>(resource).destroy(id);

        return {
            data: fields,
        };
    },

    deleteMany: async (resource, ids) => {
        const data = await airtableClient<any>(resource).destroy(ids);

        return {
            data: data as any,
        };
    },

    getApiUrl: () => {
        throw Error("not implemented");
    },

    custom: async (url, method, params = {}) => {
        throw Error("not implemented");
    },
});

export default AirtableDataProvider;

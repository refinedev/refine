import { CrudFilters, CrudOperators, DataProvider } from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { stringify } from "query-string";
import { AxiosInstance } from "axios";

//TEMP URL
//const API_URL = "https://refine-real-world.herokuapp.com/api";

import { API_URL } from "./constants";

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "eq":
            return "";
        default:
            throw new Error(`Operator ${operator} is not supported`);
    }
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map((filter: any) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;

                const mappedOperator = mapOperator(operator);
                queryFilters[`${field}${mappedOperator}`] = value;
            }
        });
    }

    return queryFilters;
};

export const dataProvider = (axios: AxiosInstance): DataProvider => {
    return {
        ...restDataProvider(API_URL, axios),
        getList: async ({ resource, pagination, filters, metaData }) => {
            const url = `${API_URL}/${resource}`;

            // pagination
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            const queryFilters = generateFilter(filters);

            const query: {
                limit: number;
                offset: number;
            } = {
                offset: (current - 1) * pageSize,
                limit: pageSize,
            };

            const { data } = await axios.get(
                `${url}?${stringify(query)}&${stringify(queryFilters)}`,
            );

            return {
                data: data[metaData?.resource ?? resource],
                total:
                    data[`${metaData?.resource ?? resource}Count`] || undefined,
            };
        },
        getOne: async ({ resource, id, metaData }) => {
            const url = metaData?.getComments
                ? `${API_URL}/${resource}/${id}/comments`
                : `${API_URL}/${resource}/${id}`;

            const { data } = await axios.get(url);

            return {
                data: data[metaData?.resource || resource],
            };
        },
        update: async ({ resource, id, variables, metaData }) => {
            const url = metaData?.URLSuffix
                ? `${API_URL}/${resource}/${id}/${metaData.URLSuffix}`
                : `${API_URL}/${resource}/${id}`;

            const { data } = metaData?.URLSuffix
                ? await axios.post(url)
                : await axios.put(url, variables);

            return {
                data,
            };
        },

        deleteOne: async ({ resource, id, variables, metaData }) => {
            const url = metaData?.URLSuffix
                ? `${API_URL}/${resource}/${id}/${metaData.URLSuffix}`
                : `${API_URL}/${resource}/${id}`;

            const { data } = await axios.delete(url, {
                data: variables,
            });

            return {
                data,
            };
        },
    };
};

import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    DataProvider,
} from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { stringify } from "query-string";
import axios, { AxiosInstance } from "axios";

const API_URL = "https://api.realworld.io/api";

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
        case "eq":
        default:
            return "";
    }
};

const generateSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        const _sort: string[] = [];
        const _order: string[] = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });

        return {
            _sort,
            _order,
        };
    }

    return;
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                if (field === "q") {
                    queryFilters[field] = value;
                    return;
                }

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
        getList: async ({ resource, pagination, filters, sort }) => {
            const url = `${API_URL}/${resource}`;

            // pagination
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            const queryFilters = generateFilter(filters);

            const query: {
                _start: number;
                _end: number;
                _sort?: string;
                _order?: string;
            } = {
                _start: (current - 1) * pageSize,
                _end: current * pageSize,
            };

            const generatedSort = generateSort(sort);
            if (generatedSort) {
                const { _sort, _order } = generatedSort;
                query._sort = _sort.join(",");
                query._order = _order.join(",");
            }

            const { data } = await axios.get(
                `${url}?${stringify(query)}&${stringify(queryFilters)}`,
            );

            console.log(data, resource, data[resource]);
            return {
                data: data[resource],
                total: data[`${resource}Count`] || undefined,
            };
        },
    };
};

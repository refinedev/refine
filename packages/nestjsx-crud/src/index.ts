import axios from "axios";
import {
    QueryFilter,
    QueryFilterArr,
    QuerySort,
    QuerySortArr,
    QuerySortOperator,
    RequestQueryBuilder,
    CondOperator,
} from "@nestjsx/crud-request";
import { DataProvider } from "readmin";

type SortBy = QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>;
type CrudFilters =
    | QueryFilter
    | QueryFilterArr
    | Array<QueryFilter | QueryFilterArr>;

const NestsxCrud = (apiUrl: string): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        const { sort } = params;

        let sortBy: SortBy = { field: "id", order: "DESC" };
        if (sort) {
            if (Array.isArray(sort)) {
                const multipleSort: SortBy = [];
                sort.map(({ field, order }) => {
                    if (field && order) {
                        multipleSort.push({
                            field: field as string,
                            order: order
                                .replace("end", "")
                                .toUpperCase() as QuerySortOperator,
                        });
                    }
                });
                sortBy = multipleSort;
            } else {
                const { field, order } = sort;

                if (field && order) {
                    sortBy = [
                        {
                            field: field as string,
                            order: order
                                .replace("end", "")
                                .toUpperCase() as QuerySortOperator,
                        },
                    ];
                }
            }
        }

        // filters
        const crudFilters: CrudFilters = [];
        const { filters } = params;
        if (filters) {
            Object.keys(filters).map((field) => {
                if (filters[field]) {
                    crudFilters.push({
                        field,
                        operator: CondOperator.IN,
                        value: filters[field],
                    });
                }
            });
        }

        // search
        const searchFilter: CrudFilters = [];
        const { search } = params;
        if (search?.value) {
            searchFilter.push({
                field: search.field,
                operator: CondOperator.CONTAINS,
                value: search.value,
            });
        }

        const query = RequestQueryBuilder.create()
            .setFilter(crudFilters)
            .setOr(searchFilter)
            .setLimit(pageSize)
            .setPage(current)
            .sortBy(sortBy)
            .setOffset((current - 1) * pageSize)
            .query();

        const { data } = await axios.get(`${url}?${query}`);

        return {
            data: data.data,
            total: data.total,
        };
    },

    getMany: async (resource, ids) => {
        const url = `${apiUrl}/${resource}`;

        const query = RequestQueryBuilder.create()
            .setFilter({
                field: "id",
                operator: CondOperator.IN,
                value: ids,
            })
            .query();

        const { data } = await axios.get(`${url}?${query}`);

        return {
            data,
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await axios.post(url, params);

        return {
            data,
        };
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.patch(url, params);

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await axios.patch(
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

        const { data } = await axios.get(url);

        return {
            data,
        };
    },

    deleteOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.delete(url);

        return {
            data,
        };
    },

    deleteMany: async (resource, ids) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await axios.delete(
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

export default NestsxCrud;

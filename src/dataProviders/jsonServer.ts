import axios from "axios";
import { stringify } from "query-string";

import { IDataContext } from "@interfaces";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        // search
        const q = params.search;

        // pagination
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        // sort
        const field = params.sort?.field || "id";
        const order = params.sort?.order || "DESC";

        // filter
        const filter = params.filter;

        const query = {
            ...filter,
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
            _sort: field,
            _order: order,
            q,
        };

        const { data, headers } = await axios.get(`${url}?${stringify(query)}`);

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    getMany: async (resource, ids) => {
        const { data } = await axios.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );
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

        const { data } = await axios.put(url, params);

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await axios.put(
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
});

export default JsonServer;

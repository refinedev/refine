import axios from "axios";
import { stringify } from "query-string";

import { IDataContext, Record } from "@interfaces";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const q = params.search;
        const { current, pageSize } = params.pagination;
        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
            q,
        };

        const { data, headers } = await axios.get<Record[]>(
            `${url}?${stringify(query)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await axios.post<Record>(url, params);

        return {
            data,
        };
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.put<Record>(url, params);

        return {
            data,
        };
    },

    getOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.get<Record>(url);

        return {
            data,
        };
    },

    deleteOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.delete<Record>(url);

        return {
            data,
        };
    },
});

export default JsonServer;

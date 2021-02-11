import axios from "axios";
import { stringify } from "query-string";

import {
    GetListResponse,
    CreateResponse,
    UpdateResponse,
    DeleteOneResponse,
    IDataContext,
    Record,
    GetOneResponse,
} from "@interfaces";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource, params): Promise<GetListResponse> => {
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

        const { data, headers } = await axios.get<Record[]>(
            `${url}?${stringify(query)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    create: async (resource, params): Promise<CreateResponse> => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await axios.post<Record>(url, params);

        return {
            data,
        };
    },

    update: async (resource, id, params): Promise<UpdateResponse> => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.put<Record>(url, params);

        return {
            data,
        };
    },

    getOne: async (resource, id): Promise<GetOneResponse> => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.get<Record>(url);

        return {
            data,
        };
    },

    deleteOne: async (resource, id): Promise<DeleteOneResponse> => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.delete<Record>(url);

        return {
            data,
        };
    },
});

export default JsonServer;

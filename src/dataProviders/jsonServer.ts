import axios from "axios";
import { stringify } from "query-string";

import { IDataContext } from "@contexts/data";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { page, perPage } = params.pagination;
        const query = {
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };

        return axios.get(`${url}?${stringify(query)}`);
    },
});

export default JsonServer;

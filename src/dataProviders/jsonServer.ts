import axios from "axios";
import { stringify } from "query-string";

import { IDataContext, Record } from "@interfaces";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { current, pageSize } = params.pagination;
        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
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
});

export default JsonServer;

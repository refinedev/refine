import axios from "axios";

import { IDataContext } from "@contexts/data";

const JsonServer = (apiUrl: string): IDataContext => ({
    getList: async (resource) => {
        const url = `${apiUrl}/${resource}`;

        return axios.get(url);
    },
});

export default JsonServer;

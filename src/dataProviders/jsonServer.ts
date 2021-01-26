import { DataContextProps } from "@contexts/data";

const JsonServer = (apiUrl: string): DataContextProps => ({
    getList: (resource, params) => {
        console.log("apiUrl", apiUrl);
        console.log("resource", resource);
        console.log("params", params);
        return Promise.resolve([
            {
                title: "title 1",
                content: "content 1",
            },
            {
                title: "title 2",
                content: "content 2",
            },
            {
                title: "title 3",
                content: "content 3",
            },
        ]);
    },
});

export default JsonServer;

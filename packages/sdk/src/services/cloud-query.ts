import { Client } from "../client";

class CloudQuery {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async runQuery(params: {
        key: string;
        config?: any;
        customParams?: any;
    }): Promise<any> {
        return await this.client.call({
            method: "get",
            url: "/data-sources/connections/run",
            params,
        });
    }

    async runMutation(data: {
        key: string;
        config?: any;
        customParams?: any;
    }): Promise<any> {
        return await this.client.call({
            method: "post",
            url: "/data-sources/connections/run",
            data,
        });
    }
}

export { CloudQuery };

import { Client } from "../client";

class CloudQuery {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(data: { key: string; config?: any }): Promise<any> {
        return await this.client.call({
            method: "post",
            url: "/data-sources/connections/run",
            data,
        });
    }
}

export { CloudQuery };

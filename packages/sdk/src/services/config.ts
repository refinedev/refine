import { Client } from "../client";

import { IConfig } from "../interfaces";

class Config {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async get(): Promise<IConfig> {
        return await this.client.call({
            method: "get",
            url: `/config?applicationClientId=${this.client.getClientId()}`,
        });
    }
}

export { Config };

import { Client } from "../client";

import { IResourcesConfig, IAuthConfig, IAuthConfigItem } from "../interfaces";

class Config {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async resources(): Promise<IResourcesConfig> {
        return await this.client.call({
            method: "get",
            url: `/config/resources?applicationClientId=${this.client.getClientId()}`,
        });
    }

    async auth(): Promise<IAuthConfig> {
        const authentications: IAuthConfig = await this.client.call({
            method: "get",
            url: `/config/auth?applicationClientId=${this.client.getClientId()}`,
        });

        return authentications.map((auth: IAuthConfigItem) => ({
            ...auth,
            url: `${this.client.getBaseUrl()}/oauth/${
                auth.type
            }?applicationClientId=${this.client.getClientId()}`,
        }));
    }
}

export { Config };

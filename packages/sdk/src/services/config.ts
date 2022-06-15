import { Client } from "../client";

import { IResourcesConfig, IAuthConfig, IAuthConfigItem } from "../interfaces";

class Config {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async resources(resourceName: string): Promise<IResourcesConfig> {
        return await this.client.call({
            method: "get",
            url: `/config/resources?applicationClientId=${this.client.getClientId()}&resourceName=${resourceName}`,
        });
    }

    async auth(): Promise<IAuthConfig> {
        const applicationClientId = this.client.getClientId();
        const authentications: IAuthConfig = await this.client.call({
            method: "get",
            url: `/config/auth?applicationClientId=${applicationClientId}`,
        });

        return authentications.map((auth: IAuthConfigItem) => ({
            ...auth,
            url: `${this.client.getBaseUrl()}/oauth/${
                auth.type
            }?applicationClientId=${applicationClientId}`,
        }));
    }
}

export { Config };

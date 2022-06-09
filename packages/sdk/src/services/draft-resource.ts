import { Client } from "../client";

import { IDraftResource, IResource } from "../interfaces";

class DraftResource {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async create(data: { resources: IResource[] }): Promise<IDraftResource[]> {
        const refineCloudToken = this.client.getRefineCloudToken();

        return await this.client.call({
            method: "post",
            url: "/draft-resource/client",
            data,
            headers: {
                "x-refine-cloud-token": refineCloudToken || "",
            },
        });
    }

    async get(): Promise<IDraftResource> {
        const refineCloudToken = this.client.getRefineCloudToken();

        return await this.client.call({
            method: "get",
            url: `/draft-resource/client?applicationClientId=${this.client.getClientId()}`,
            headers: {
                "x-refine-cloud-token": refineCloudToken || "",
            },
        });
    }
}

export { DraftResource };

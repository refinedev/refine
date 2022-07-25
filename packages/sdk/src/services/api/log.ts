import { stringify } from "query-string";

import { Client } from "../../client";
import { ILog } from "@interfaces";

class LogApi {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async create(data: {
        data?: Record<number | string, any>;
        previousData?: Record<number | string, any>;
        meta: Record<number | string, any>;
        author: Record<number | string, any>;
        resource: string;
        action: string;
        name?: string;
    }): Promise<ILog> {
        return await this.client.call({
            method: "post",
            url: `/log`,
            data: {
                ...data,
                applicationClientId: this.client.getClientId(),
                applicationClientSecret: this.client.getClientSecret(),
            },
        });
    }

    async get(params?: {
        resource?: string;
        action?: string;
        startDate?: string;
        endDate?: string;
        meta?: Record<number | string, any>;
        author?: Record<number | string, any>;
    }): Promise<ILog[]> {
        return await this.client.call({
            method: "get",
            url: `/log?applicationClientId=${this.client.getClientId()}&applicationClientSecret=${this.client.getClientSecret()}`,
            params: {
                ...params,
                meta: params?.meta ? stringify(params?.meta) : undefined,
                author: params?.author ? stringify(params?.author) : undefined,
            },
        });
    }

    async update(
        id: string,
        data?: {
            name: string;
        },
    ): Promise<ILog> {
        return await this.client.call({
            method: "patch",
            url: `/log/${id}`,
            data: {
                ...data,
                applicationClientId: this.client.getClientId(),
                applicationClientSecret: this.client.getClientSecret(),
            },
        });
    }
}

export { LogApi };

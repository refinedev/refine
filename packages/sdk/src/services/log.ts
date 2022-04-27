import { stringify } from "query-string";

import { Client } from "../client";
import { LogApi } from "./api/log";
import { Resource } from "@interfaces";

class Log {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    get api(): LogApi {
        return new LogApi(this.client);
    }

    async create(data: {
        meta: Record<number | string, any>;
        data?: Record<number | string, any>;
        previousData?: Record<number | string, any>;
        resource: string;
        action: string;
        name?: string;
    }): Promise<Resource> {
        return await this.client.call({
            method: "post",
            url: "/log/client",
            data,
        });
    }

    async get(params: {
        meta: Record<number | string, any>;
        resource?: string;
        action?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<Resource> {
        return await this.client.call({
            method: "get",
            url: "/log/client",
            params: {
                ...params,
                meta: stringify(params.meta),
            },
        });
    }

    async update(
        id: string | number,
        data?: {
            name: string;
        },
    ): Promise<Resource> {
        return await this.client.call({
            method: "patch",
            url: `/log/client/${id}`,
            data,
        });
    }
}

export { Log };

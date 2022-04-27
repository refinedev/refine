import { Client } from "../../client";
import { Resource } from "@interfaces";

class LogApi {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async create(data: {
        applicationClientId: string;
        applicationClientSecret: string;
        data?: Record<number | string, any>;
        previousData?: Record<number | string, any>;
        meta: Record<number | string, any>;
        resource: string;
        action: string;
        name?: string;
    }): Promise<Resource> {
        return await this.client.call({
            method: "post",
            url: "/log",
            data,
        });
    }

    async get(params?: {
        applicationClientId: string;
        applicationClientSecret: string;
        resource?: string;
        action?: string;
        startDate?: string;
        endDate?: string;
        meta: Record<number | string, any>;
    }): Promise<Resource> {
        return await this.client.call({
            method: "get",
            url: "/log",
            params,
        });
    }

    async update(
        id: string,
        data?: {
            applicationClientId: string;
            applicationClientSecret: string;
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

export { LogApi };

import { Client } from "./client";
import { IResource } from "./interfaces";

const createClient = (payload: {
    baseUrl: string;
    clientId: string;
    clientSecret?: string;
}): Client => {
    const { baseUrl, clientId, clientSecret } = payload;

    return new Client({
        baseUrl,
        clientId,
        clientSecret,
    });
};

export { createClient, Client, IResource };

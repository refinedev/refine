import { Client } from "./client";
export * from "./interfaces";

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

export { createClient, Client };

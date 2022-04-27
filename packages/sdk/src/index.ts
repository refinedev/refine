import { Client } from "./client";

const createClient = (payload: {
    baseUrl: string;
    clientId: string;
}): Client => {
    const { baseUrl, clientId } = payload;

    return new Client({
        baseUrl,
        clientId,
    });
};

export { createClient };

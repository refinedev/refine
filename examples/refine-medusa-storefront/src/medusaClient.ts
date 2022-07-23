import Medusa from "@medusajs/medusa-js";

let client: Medusa | undefined = undefined;

export const getMedusaClient = (apiUrl?: string): Medusa => {
    if (!client) {
        client = new Medusa({
            baseUrl: apiUrl || "",
            maxRetries: 0,
        });
    }
    return client;
};

export const resetMedusaClient = (): void => {
    client = undefined;
};

import { createClient } from "@refinedev/sdk";

export default createClient({
    baseUrl: "https://audit.cloud.api.refine.dev",
    clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
});

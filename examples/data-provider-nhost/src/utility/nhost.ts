import { NhostClient } from "@nhost/nhost-js";
import { graphqlWS } from "@refinedev/nhost";

const API_URL = "https://oxhhlmqsjahbyedrmvll.nhost.run";
const WS_URL = "ws://oxhhlmqsjahbyedrmvll.nhost.run/v1/graphql";

export const nhost = new NhostClient({
    backendUrl: API_URL,
});

export const gqlWebSocketClient = graphqlWS.createClient({
    url: WS_URL,
    connectionParams: () => {
        const token = nhost.auth.getJWTToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    },
});

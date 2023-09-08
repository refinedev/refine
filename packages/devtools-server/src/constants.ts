export const DEFAULT_WS_PORT = 5002;
export const DEFAULT_SERVER_PORT = 5001;

export const WS_PORT = Number(process.env.WS_PORT || DEFAULT_WS_PORT);
export const SERVER_PORT = Number(process.env.PORT || DEFAULT_SERVER_PORT);

export const FEED_MD_URL =
    "https://raw.githubusercontent.com/refinedev/refine/next/packages/devtools-server/FEED.md";

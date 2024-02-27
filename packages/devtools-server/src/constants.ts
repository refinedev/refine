export const DEFAULT_WS_PORT = 5002;
export const DEFAULT_SERVER_PORT = 5001;

export const WS_PORT = DEFAULT_WS_PORT;
export const SERVER_PORT = DEFAULT_SERVER_PORT;

export const REFINE_API_URL = __DEVELOPMENT__
  ? "https://develop.cloud.refine.dev"
  : "https://cloud2.refine.dev";

export const FEED_MD_URL =
  "https://raw.githubusercontent.com/refinedev/refine/master/packages/devtools-server/FEED.md";

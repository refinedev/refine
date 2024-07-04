export const DEFAULT_SERVER_PORT = 5001;
export const SERVER_PORT = DEFAULT_SERVER_PORT;

export const AUTH_SERVER_URL = __DEVELOPMENT__
  ? "https://develop.auth.refine.dev"
  : "https://auth.refine.dev";

export const REFINE_API_URL = __DEVELOPMENT__
  ? "https://develop.cloud.refine.dev"
  : "https://cloud2.refine.dev";

export const AUTH_TRIGGER_API_PATH = "/api/login";
export const AUTH_CALLBACK_API_PATH = "/api/login-callback";
export const AUTH_CALLBACK_UI_PATH = "/after-login";

export const FEED_MD_URL =
  "https://raw.githubusercontent.com/refinedev/refine/master/packages/devtools-server/FEED.md";

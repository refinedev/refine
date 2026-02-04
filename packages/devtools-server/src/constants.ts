import dotenv from "dotenv";

const refineEnv: Record<string, string> = {};
dotenv.config({ processEnv: refineEnv });

const RAW_ENV_REFINE_DEVTOOLS_PORT =
  process.env.REFINE_DEVTOOLS_PORT || refineEnv.REFINE_DEVTOOLS_PORT;
export const DEFAULT_SERVER_PORT = 5001;
export const SERVER_PORT =
  Number(RAW_ENV_REFINE_DEVTOOLS_PORT) || DEFAULT_SERVER_PORT;

export const REFINE_API_URL = __DEVELOPMENT__
  ? "https://develop.cloud.refine.dev"
  : "https://cloud2.refine.dev";

export const FEED_MD_URL =
  "https://raw.githubusercontent.com/refinedev/refine/main/packages/devtools-server/FEED.md";

import type { NODE_ENV } from "@definitions/node";
import * as dotenv from "dotenv";
dotenv.config();

const envSearchMap: Record<Exclude<NODE_ENV, "custom">, RegExp> = {
  development: /dev/i,
  production: /prod/i,
  test: /test|tst/i,
  "continuous-integration": /ci/i,
  "user-acceptance-testing": /uat/i,
  "system-integration-testing": /sit/i,
};

export const getNodeEnv = (): NODE_ENV => {
  const nodeEnv = process.env.NODE_ENV;

  if (!nodeEnv) {
    return "development";
  }

  let env: NODE_ENV = "custom";

  for (const [key, value] of Object.entries(envSearchMap)) {
    if (value.test(nodeEnv)) {
      env = key as NODE_ENV;
      break;
    }
  }

  return env;
};

export const ENV = {
  NODE_ENV: getNodeEnv(),
  REFINE_NO_TELEMETRY: process.env.REFINE_NO_TELEMETRY || "false",
  UPDATE_NOTIFIER_IS_DISABLED:
    process.env.UPDATE_NOTIFIER_IS_DISABLED || "false",
  UPDATE_NOTIFIER_CACHE_TTL:
    process.env.UPDATE_NOTIFIER_CACHE_TTL || 1000 * 60 * 60 * 24, // 24 hours,
  REFINE_PROXY_DOMAIN: process.env.REFINE_PROXY_DOMAIN || "https://refine.dev",
  REFINE_PROXY_TARGET:
    process.env.REFINE_PROXY_TARGET || "http://localhost:3000",
  REFINE_PROXY_PORT: process.env.REFINE_PROXY_PORT || "7313",
  REFINE_PROXY_REWRITE_URL:
    process.env.REFINE_REWRITE_URL || "http://localhost:7313",
};

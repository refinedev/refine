import { NODE_ENV } from "@definitions/node";
import { env } from "node-env-type";
import * as dotenv from "dotenv";
dotenv.config();

export const ENV = {
    REFINE_NO_TELEMETRY: process.env.REFINE_NO_TELEMETRY || "false",
    UPDATE_NOTIFIER_IS_DISABLED:
        process.env.UPDATE_NOTIFIER_IS_DISABLED || "false",
    UPDATE_NOTIFIER_CACHE_TTL:
        process.env.UPDATE_NOTIFIER_CACHE_TTL || 1000 * 60 * 60 * 24, // 24 hours,
};

export const parseNodeEnv = (): NODE_ENV => {
    if (env.isDev) return "development";
    if (env.isProd) return "production";
    if (env.isTest) return "test";
    if (env.isCI) return "continuous-integration";
    if (env.isUAT) return "user-acceptance-testing";
    if (env.isSIT) return "system-integration-testing";

    return "custom";
};

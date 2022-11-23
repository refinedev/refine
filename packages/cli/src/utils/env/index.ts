import * as dotenv from "dotenv";
dotenv.config();

export const ENV = {
    UPDATE_NOTIFIER_IS_DISABLED:
        process.env.UPDATE_NOTIFIER_IS_DISABLED || "false",
    UPDATE_NOTIFIER_CACHE_TTL:
        process.env.UPDATE_NOTIFIER_CACHE_TTL || 1000 * 60 * 60 * 24, // 24 hours,
};

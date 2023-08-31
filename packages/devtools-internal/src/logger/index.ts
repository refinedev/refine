/**
 * Use this method to log to the devtools console.
 * These logs will not be shown in the browser console.
 * In production, these logs will be ignored.
 */
export const log = (...args: any[]) =>
    process.env.NODE_ENV === "development"
        ? console.log
        : {
              // log to ws
          };

type InternalLog = {
    type?: "log" | "warn" | "error";
    message?: string;
    title?: string;
    data?: any;
};

export const internalLog = ({
    type,
    message,
    title,
    data,
}: InternalLog = {}) => {
    // log to ws
};

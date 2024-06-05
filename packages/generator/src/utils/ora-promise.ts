import ora from "ora";

export const oraPromise = <T>(promise: Promise<T>, text: string): Promise<T> => {
    ora.promise(promise, text);
    return promise;
}
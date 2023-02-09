/*
 * Returns first value that is not undefined.
 */
export const pickNotDeprecated = <T extends unknown[]>(
    ...args: T
): T[never] => {
    return args.find((arg) => typeof arg !== "undefined");
};

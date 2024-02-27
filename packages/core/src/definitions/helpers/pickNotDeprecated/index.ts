/*
 * Returns first value that is not undefined.
 * @internal This is an internal helper function. Please do not use externally.
 */
export const pickNotDeprecated = <T extends unknown[]>(
  ...args: T
): T[never] => {
  return args.find((arg) => typeof arg !== "undefined");
};

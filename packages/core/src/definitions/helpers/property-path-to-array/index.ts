export const propertyPathToArray = (propertyPath: string) => {
  return propertyPath
    .split(".")
    .map((item) => (!Number.isNaN(item) ? Number(item) : item));
};

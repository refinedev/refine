export const propertyPathToArray = (propertyPath: string) => {
    return propertyPath
        .split(".")
        .map((item) => (!isNaN(Number(item)) ? Number(item) : item));
};

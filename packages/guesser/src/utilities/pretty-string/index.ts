/**
 * This helper will prettify the string.
 */
export const prettyString = (str: string) => {
    // Convert camelCase to camel Case
    const camelCase = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Convert snake_case to snake case
    const snakeCase = camelCase.replace(/_/g, " ");
    // Convert kebab-case to kebab case
    const kebabCase = snakeCase.replace(/-/g, " ");
    // Capitalize the string
    const capitalized = kebabCase
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return capitalized;
};

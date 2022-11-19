import pluralize from "pluralize";

/**
 * Returns the component name based on the resource name and inferencer type.
 * @example componentName("users", "list") === "UserList"
 */
export const componentName = (
    resourceName: string,
    type: "list" | "show" | "edit",
) => {
    const resourcePrefix = pluralize.isSingular(resourceName)
        ? resourceName
        : pluralize.singular(resourceName);

    const componentName = `${
        resourcePrefix.charAt(0).toUpperCase() + resourcePrefix.slice(1)
    }${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return componentName;
};

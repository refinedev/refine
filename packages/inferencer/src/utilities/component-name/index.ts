import pluralize from "pluralize";
import { prettyString } from "../pretty-string";

/**
 * Returns the component name based on the resource name and inferencer type.
 * @example componentName("users", "list") === "UserList"
 */
export const componentName = (
    resourceName: string,
    type: "list" | "show" | "edit" | "create",
) => {
    const resourcePrefix = pluralize.isSingular(resourceName)
        ? resourceName
        : pluralize.singular(resourceName);

    // if resourcePrefix is number, return Resource + capitalized type
    // e.g. 1 => "ResourceList"
    if (Number.isInteger(Number(resourcePrefix))) {
        return "Resource" + type.charAt(0).toUpperCase() + type.slice(1);
    }

    // if resourcePrefix is start with numbers, replace the numbers with empty string
    // e.g. 123users => "users"
    const resourcePrefixWithoutNumbers = resourcePrefix.replace(/^\d+/, "");

    // if resourcePrefix has invalid characters, replace them with empty string
    // e.g. "users/account" => "users-account"
    const resourcePrefixWithoutInvalidCharacters =
        resourcePrefixWithoutNumbers.replace(/[^a-zA-Z0-9]/g, "-");

    const prettyResourceName = prettyString(
        resourcePrefixWithoutInvalidCharacters,
    ).replace(/ /g, "");

    const componentName = `${
        prettyResourceName.charAt(0).toUpperCase() + prettyResourceName.slice(1)
    }${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return componentName;
};

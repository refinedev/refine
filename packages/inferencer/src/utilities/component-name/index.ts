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
    // replace all non-alphanumeric characters with a space
    const sanitized = resourceName.replace(/[^a-zA-Z0-9]/g, " ");
    // convert to singular
    const singular = pluralize.singular(sanitized);
    // prettify the string without spaces
    const prettified = prettyString(singular).replace(/ /g, "");
    // get pretty type name
    const prettyType = type.charAt(0).toUpperCase() + type.slice(1);

    // if resourceName is not starting with an alphabetical character, return Type + resourceName
    // e.g. "123users" => "List123Users"
    if (!/^[a-zA-Z]/.test(resourceName)) {
        return `${prettyType}${prettified}`;
    }
    // e.g. "users" => "UserList"
    return `${prettified}${prettyType}`;
};

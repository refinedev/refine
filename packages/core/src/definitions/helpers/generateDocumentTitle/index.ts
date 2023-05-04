import { IResourceItem } from "@contexts/resource";
import capitalize from "lodash/capitalize";

/**
 * Generates document title for the given resource and action.
 */
export function generateDefaultDocumentTitle(
    resource: IResourceItem,
    action: string,
    id?: string,
) {
    const actionPrefixMatcher = {
        create: "Create new ",
        edit: `#${id ?? ""} Edit `,
        show: `#${id ?? ""} Show `,
        list: "",
    };

    // convert resource name to singular for actions other than list
    const resourceName =
        action !== "list" && resource.name.endsWith("s")
            ? resource.name.slice(0, -1)
            : resource.name;

    return `${
        actionPrefixMatcher[action as keyof typeof actionPrefixMatcher]
    }${capitalize(resourceName)} | Refine`;
}

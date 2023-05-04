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
        edit: `#${id} Edit `,
        show: `#${id} Show `,
        list: "",
    };

    return `${
        actionPrefixMatcher[action as keyof typeof actionPrefixMatcher]
    }${capitalize(resource.name)} | Refine`;
}

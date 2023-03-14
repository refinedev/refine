import { IResourceItem } from "src/interfaces/bindings/resource";
import { removeLeadingTrailingSlashes } from "../router/remove-leading-trailing-slashes";

/**
 * Picks the resource based on the provided identifier.
 * Identifier fallbacks to `name` if `identifier` is not explicitly provided to the resource.
 * If legacy is true, then resource is matched by `route` first and then by `name`.
 */
export const pickResource = (
    identifier?: string,
    resources: IResourceItem[] = [],
    /**
     * If true, the identifier will be checked for `route` and `name` properties
     */
    legacy = false,
): IResourceItem | undefined => {
    if (!identifier) {
        return undefined;
    }

    if (legacy) {
        const resourceByRoute = resources.find(
            (r) =>
                removeLeadingTrailingSlashes(r.route ?? "") ===
                removeLeadingTrailingSlashes(identifier),
        );

        const resource = resourceByRoute
            ? resourceByRoute
            : resources.find((r) => r.name === identifier);

        return resource;
    }

    const resource = resources.find(
        (r) => (r.identifier ?? r.name) === identifier,
    );

    return resource;
};

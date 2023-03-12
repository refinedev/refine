import { IResourceItem } from "../../../interfaces";
import {
    getParentResource,
    removeLeadingTrailingSlashes,
} from "../../helpers/router";

export const createResourceKey = (
    resource: IResourceItem,
    resources: IResourceItem[],
    legacy = false,
) => {
    const parents: IResourceItem[] = [];

    let currentParentResource = getParentResource(resource, resources);
    while (currentParentResource) {
        parents.push(currentParentResource);
        currentParentResource = getParentResource(
            currentParentResource,
            resources,
        );
    }
    parents.reverse();

    const key = [...parents, resource]
        .map((r) =>
            removeLeadingTrailingSlashes(
                (legacy ? r.route : undefined) ?? r.identifier ?? r.name,
            ),
        )
        .join("/");

    return `/${key.replace(/^\//, "")}`;
};

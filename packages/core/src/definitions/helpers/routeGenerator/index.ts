import { ResourceProps } from "src/interfaces";
import { pickNotDeprecated } from "../pickNotDeprecated";

const getParentOf = (item: ResourceProps) => {
    return (resourceItem: ResourceProps) =>
        item.parentName ? resourceItem.name === item.parentName : false;
};

export const routeGenerator = (
    item: ResourceProps,
    resourcesFromProps: ResourceProps[],
): string | undefined => {
    let route;

    const resourceMeta = pickNotDeprecated(item?.meta, item?.options);
    const resourceRoute = resourceMeta?.route ?? item.name;

    if (item.parentName) {
        const parent = resourcesFromProps.find(getParentOf(item));
        const parentMeta = pickNotDeprecated(parent?.meta, parent?.options);

        if (parent?.parentName) {
            const routePrefix = routeGenerator(parent, resourcesFromProps);

            route = `${routePrefix}/${resourceRoute}`;
        } else if (item.parentName) {
            const parentPrefix =
                parentMeta?.route ?? parent?.name ?? item.parentName;
            route = `${parentPrefix}/${resourceRoute}`;
        }
    } else {
        route = resourceRoute;
    }
    return route;
};

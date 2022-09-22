import { ResourceProps } from "src/interfaces";

const getParentOf = (item: ResourceProps) => {
    return (resourceItem: ResourceProps) =>
        item.parentName ? resourceItem.name === item.parentName : false;
};

export const routeGenerator = (
    item: ResourceProps,
    resourcesFromProps: ResourceProps[],
): string | undefined => {
    let route;

    const resourceRoute = item.options?.route ?? item.name;

    if (item.parentName) {
        const parent = resourcesFromProps.find(getParentOf(item));

        if (parent?.parentName) {
            const routePrefix = routeGenerator(parent, resourcesFromProps);

            route = `${routePrefix}/${resourceRoute}`;
        } else if (item.parentName) {
            const parentPrefix =
                parent?.options?.route ?? parent?.name ?? item.parentName;
            route = `${parentPrefix}/${resourceRoute}`;
        }
    } else {
        route = resourceRoute;
    }
    return route;
};

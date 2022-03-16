import { ResourceProps } from "src/interfaces";

export const routeGenerator = (
    item: ResourceProps,
    resourcesFromProps: ResourceProps[],
): string | undefined => {
    let route;

    if (item.parentName) {
        const hasParentName = resourcesFromProps?.find(
            (p) => p.name === item.parentName,
        );

        if (hasParentName?.parentName) {
            route =
                routeGenerator(hasParentName, resourcesFromProps) +
                `/${item.name}`;
            routeGenerator(hasParentName, resourcesFromProps);
        } else if (item.parentName) {
            route = `${item.parentName}/${item.name}`;
        }
    } else {
        route = item.name;
    }
    return route;
};

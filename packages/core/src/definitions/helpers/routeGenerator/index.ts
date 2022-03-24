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
        const path = resourcesFromProps?.find((p) => p.key === item.parentName);

        if (hasParentName?.parentName) {
            route =
                routeGenerator(hasParentName, resourcesFromProps) +
                `/${item.name}`;
            routeGenerator(hasParentName, resourcesFromProps);
        } else if (item.parentName) {
            route = `${path?.name}/${item.name}`;
        }
    } else {
        route = item.name;
    }
    return route;
};

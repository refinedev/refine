export const paramsFromCurrentPath = (
    pathname: string,
    matchingRoute: string,
) => {
    const params: Record<string, string> = {};

    // remove leading and trailing slashes
    const sanitizedMatchingRoute = matchingRoute.replace(/^\/|\/$/g, "");
    const sanitizedPathname = pathname.replace(/^\/|\/$/g, "");

    const matchingRouteParts = sanitizedMatchingRoute.split("/");
    const pathnameParts = sanitizedPathname.split("/");

    matchingRouteParts.forEach((part, index) => {
        if (part.startsWith(":")) {
            params[part.replace(":", "")] = pathnameParts[index];
        }
    });

    return params;
};

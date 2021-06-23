import humanizeString from "humanize-string";
import pluralize from "pluralize";

export const userFriendlyResourceName = (
    resource: string,
    type: "singular" | "plural",
): string => {
    const humanizeResource = humanizeString(resource);
    if (type === "singular") {
        return pluralize.singular(humanizeResource);
    }
    return pluralize.plural(humanizeResource);
};

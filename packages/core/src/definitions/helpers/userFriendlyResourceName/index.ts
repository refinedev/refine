import { useRefineContext } from "@hooks/refine";

/**
 * A method that the internal uses
 * @internal
 */
export const userFriendlyResourceName = (
    resource = "",
    type: "singular" | "plural",
): string => {
    const {
        options: { textTransformers },
    } = useRefineContext();

    const humanizeResource = textTransformers.humanize(resource);
    if (type === "singular") {
        return textTransformers.singular(humanizeResource);
    }
    return textTransformers.plural(humanizeResource);
};

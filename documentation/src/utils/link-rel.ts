/**
 * This function will generate rel attribute for links.
 * @param {string} URL to be dest for link
 */
export const getLinkRel = (URL?: string): string => {
    let rel = "noopener noreferrer";

    if (URL.includes("github.com/refinedev/refine")) {
        rel = "noopener";
    }

    if (URL.includes("refine.dev")) {
        rel = "noopener dofollow";
    }

    return rel;
};

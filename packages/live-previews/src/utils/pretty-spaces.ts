export const prettySpaces = (content: string) => {
    return content.replace(/ {2,}/g, " ").replace(/\n{2,}/g, "\n");
};

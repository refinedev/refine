import decamelize from "decamelize";

export const humanizeString = (text: string): string => {
    text = decamelize(text);
    text = text
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
    text = text.charAt(0).toUpperCase() + text.slice(1);

    return text;
};
// https://www.npmjs.com/package/humanize-string

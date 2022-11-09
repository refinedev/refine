import { FieldGuesser } from "@/types";

const urlRegexp = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;

export const urlGuess: FieldGuesser = (key, value) => {
    const isValidURL = typeof value === "string" && urlRegexp.test(value);

    if (isValidURL) {
        return {
            key,
            type: "url",
            priority: 1,
        };
    }

    return false;
};

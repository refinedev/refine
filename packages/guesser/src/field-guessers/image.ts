import { FieldGuesser } from "@/types";

const imageRegexp = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg)$/i;

export const imageGuess: FieldGuesser = (key, value) => {
    const isImageURI = typeof value === "string" && imageRegexp.test(value);

    if (isImageURI) {
        return {
            key,
            type: "image",
            priority: 2,
        };
    }

    return false;
};

import { FieldGuesser } from "@/types";

export const textGuess: FieldGuesser = (key, value) => {
    const isText = typeof value === "string";

    if (isText) {
        return {
            key,
            type: "text",
        };
    }

    return false;
};

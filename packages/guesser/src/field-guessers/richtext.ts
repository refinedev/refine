import { FieldGuesser } from "@/types";

export const richtextGuess: FieldGuesser = (key, value) => {
    const isLongText = typeof value === "string" && value.length > 100;

    if (isLongText) {
        return {
            key,
            type: "richtext",
            priority: 1,
        };
    }

    return false;
};

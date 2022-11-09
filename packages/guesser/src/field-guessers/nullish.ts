import { FieldGuesser } from "@/types";

export const nullishGuess: FieldGuesser = (key, value) => {
    const isUndefined = typeof value === "undefined";
    const isNull = value === null;

    if (isUndefined || isNull) {
        return null;
    }

    return false;
};

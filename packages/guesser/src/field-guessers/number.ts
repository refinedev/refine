import { FieldGuesser } from "@/types";

export const numberGuess: FieldGuesser = (key, value) => {
    const isNumber = typeof value === "number";

    if (isNumber) {
        return {
            key,
            type: "number",
        };
    }

    return false;
};

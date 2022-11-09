import { FieldGuesser } from "@/types";

export const booleanGuess: FieldGuesser = (key, value) => {
    const isBoolean = typeof value === "boolean";

    if (isBoolean) {
        return {
            key,
            type: "boolean",
        };
    }

    return false;
};

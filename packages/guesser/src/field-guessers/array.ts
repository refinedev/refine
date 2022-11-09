import { FieldGuesser, GuessType } from "@/types";

export const arrayGuess: FieldGuesser = (key, value, record, guess) => {
    const isArray = Array.isArray(value);
    const isBasicArray =
        Array.isArray(value) &&
        value.every((v) => typeof v === "string" || typeof v === "number");

    if (isArray) {
        if (!isBasicArray) {
            const guessedInnerType = guess(key, value[0], record, guess);
            if (guessedInnerType) {
                return {
                    ...guessedInnerType,
                    key,
                    multiple: true,
                    priority: 1,
                };
            } else {
                return false;
            }
        }
        const basicType = guess(key, value[0], record, guess) || {
            type: "string" as GuessType,
        };

        return {
            key,
            multiple: true,
            priority: 1,
            type: basicType?.type,
        };
    }

    return false;
};

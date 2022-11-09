import { GuessField } from "@/types";

/**
 * Each field guesser will run with every property of a record and output a result.
 * In these outputs, one with the highest priority will be picked as the guessed field.
 */
export const pickGuessedField = (
    guessedFields: Array<GuessField | null | false>,
): GuessField | null => {
    // filter out null and false values and sort by priority then return the first one
    // priority is a number, the higher the number the higher the priority
    // if there is no priority, it will be 0
    const field = (
        [...guessedFields].filter(Boolean) as Array<GuessField>
    ).sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];

    if (!field) {
        return null;
    }

    return field;
};

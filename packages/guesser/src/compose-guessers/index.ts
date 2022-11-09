import { FieldGuesser } from "@/types";
import { pickGuessedField } from "@/utilities";

/**
 * Compose multiple field guessers into one
 * @param guessers The guesser functions to compose
 */
export const composeGuessers = (
    guessers: Array<FieldGuesser>,
): FieldGuesser => {
    const fieldGuesser: FieldGuesser = (
        key,
        value,
        record,
        guess = fieldGuesser,
    ) => {
        const guesses = guessers.map((guesser) =>
            guesser(key, value, record, guess),
        );
        const picked = pickGuessedField(guesses);

        return picked;
    };

    return fieldGuesser;
};

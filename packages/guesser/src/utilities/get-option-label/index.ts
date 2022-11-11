import { GuessField } from "@/types";

export const getOptionLabel = (field: GuessField) => {
    if (field.relationGuess && field.relationGuess.accessor) {
        if (Array.isArray(field.relationGuess.accessor)) {
            return `optionLabel: "${field.relationGuess.accessor[0]}",`;
        }
        if (field.relationGuess.accessor !== "title") {
            return `optionLabel: "${field.relationGuess.accessor}",`;
        }
        return "";
    }
    return "";
};

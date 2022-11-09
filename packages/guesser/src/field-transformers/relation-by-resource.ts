import { resourceFromGuess } from "@/utilities";
import { FieldTransformer, GuessField } from "@/types";

export const relationByResource: FieldTransformer = (
    fields,
    resources,
    // resource,
    // record,
    // guess,
) => {
    const mapped: Array<GuessField> = fields.map((field) => {
        const guessResource = resourceFromGuess(field, resources);

        if (guessResource) {
            return {
                ...field,
                relation: true,
                type: "relation",
                resource: guessResource,
            };
        }

        return field;
    });

    return mapped;
};

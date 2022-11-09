import { FieldTransformer, GuessField } from "@/types";

export const relationToFieldable: FieldTransformer = (
    fields,
    resources,
    resource,
    record,
    guess,
) => {
    const mapped: Array<GuessField> = fields.map((field) => {
        if (field.relation && field.type === "relation" && !field.resource) {
            const value = field.accessor
                ? (record[field.key] as any)[field.accessor as string]
                : record[field.key];

            const guessedType = guess(field.key, value, record, guess);

            if (guessedType && guessedType.type !== "relation") {
                return {
                    ...field,
                    fieldable: true,
                    relation: false,
                    type: guessedType.type,
                };
            }
        }

        return field;
    });

    return mapped;
};

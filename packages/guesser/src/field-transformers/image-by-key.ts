import { FieldTransformer, GuessField } from "@/types";

const imageFieldLikeRegexp = /(image|photo|avatar|cover|thumbnail|icon)/i;

export const imageByKey: FieldTransformer = (fields) => {
    const mapped: Array<GuessField> = fields.map((field) => {
        if (field.type === "url" && imageFieldLikeRegexp.test(field.key)) {
            return {
                ...field,
                type: "image",
            };
        }

        return field;
    });

    return mapped;
};

import { FieldTransformer } from "@/types";

/**
 * Compose multiple field transformers into one
 * @param transformers The transformer functions to compose
 */
export const composeTransformers = (
    transformers: Array<FieldTransformer>,
): FieldTransformer => {
    const fieldTransformer: FieldTransformer = (
        fields,
        resources,
        resource,
        record,
        guess,
    ) => {
        return transformers.reduce((acc, transformer) => {
            return transformer(acc, resources, resource, record, guess);
        }, fields);
    };

    return fieldTransformer;
};

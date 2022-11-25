import React from "react";
import { useDataProvider } from "@pankod/refine-core";

import { dataProviderFromResource } from "@/utilities";
import { FieldInferencer, InferField } from "@/types";
import { get } from "lodash";

type UseRelationFetchProps = {
    record?: Record<string, unknown>;
    fields?: (InferField | null | false)[];
    infer: FieldInferencer;
};

export const useRelationFetch = ({
    record,
    fields,
    infer,
}: UseRelationFetchProps) => {
    const dataProvider = useDataProvider();

    const [updatedFields, setUpdatedFields] = React.useState<InferField[]>([]);

    const [initial, setInitial] = React.useState(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    const resolver = React.useCallback(
        async (allFields: (InferField | false | null)[]) => {
            setLoading(true);
            try {
                const promises = allFields.map(async (field) => {
                    if (field && field.relation) {
                        if (field.resource && record) {
                            const dataProviderName = dataProviderFromResource(
                                field.resource,
                            );
                            const dp = dataProvider(dataProviderName);

                            const requestId = Array.isArray(field.accessor)
                                ? undefined
                                : field.multiple
                                ? (record[field.key] as Array<unknown>).map(
                                      (el) => {
                                          return field.accessor
                                              ? get(el, field.accessor)
                                              : el;
                                      },
                                  )[0]
                                : field.accessor
                                ? get(record[field.key], field.accessor)
                                : record[field.key];

                            if (requestId) {
                                const { data } = await dp.getOne({
                                    resource: field.resource.name,
                                    id: requestId,
                                });

                                const relationInfer = infer(
                                    "__",
                                    data,
                                    {},
                                    infer,
                                );

                                return {
                                    ...field,
                                    relationInfer,
                                };
                            }
                            return {
                                ...field,
                                relationInfer: null,
                            };
                        }
                    }
                    return field;
                });

                const results = await Promise.all(promises);

                setUpdatedFields(results.filter((el) => el) as InferField[]);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [dataProvider, record],
    );

    React.useEffect(() => {
        setInitial(false);
        if (
            !loading &&
            fields &&
            fields.length > 0 &&
            updatedFields.length === 0
        ) {
            resolver(fields);
        }
    }, [resolver, loading, fields, resolver]);

    return {
        fields: updatedFields,
        loading,
        initial,
    };
};

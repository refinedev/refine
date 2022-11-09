import React from "react";
import { useDataProvider } from "@pankod/refine-core";

import { dataProviderFromResource } from "@/utilities";
import { FieldGuesser, GuessField } from "@/types";
import { get } from "lodash";

type UseRelationFetchProps = {
    record?: Record<string, unknown>;
    fields?: (GuessField | null | false)[];
    guess: FieldGuesser;
};

export const useRelationFetch = ({
    record,
    fields,
    guess,
}: UseRelationFetchProps) => {
    const dataProvider = useDataProvider();

    const [updatedFields, setUpdatedFields] = React.useState<GuessField[]>([]);

    const [initial, setInitial] = React.useState(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    const resolver = React.useCallback(
        async (allFields: (GuessField | false | null)[]) => {
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

                                const relationGuess = guess(
                                    "__",
                                    data,
                                    {},
                                    guess,
                                );

                                return {
                                    ...field,
                                    relationGuess,
                                };
                            }
                            return {
                                ...field,
                                relationGuess: null,
                            };
                        }
                    }
                    return field;
                });

                const results = await Promise.all(promises);

                setUpdatedFields(results.filter((el) => el) as GuessField[]);
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

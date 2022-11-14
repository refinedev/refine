import React from "react";
import { useResource } from "@pankod/refine-core";

import { CreateGuesser, GuesserResultComponent, GuessField } from "@/types";

import { composeGuessers } from "@/compose-guessers";
import { composeTransformers } from "@/compose-transformers";

import { defaultElements } from "@/field-guessers";
import { defaultTransformers } from "@/field-transformers";

import {
    LiveComponent,
    LoadingComponent as DefaultLoadingComponent,
    ErrorComponent as DefaultErrorComponent,
    CodeViewerComponent as DefaultCodeViewerComponent,
} from "@/components";

import { useGuessFetch } from "@/use-guess-fetch";
import { useRelationFetch } from "@/use-relation-fetch";

import { prepareLiveCode, componentName, removeHiddenCode } from "@/utilities";

/**
 * CreateGuesser is a function that creates a Guesser component.
 *
 * Guesser will handle the data fetching and the guessing parts,
 * then it will invoke the `renderer` function to generate the code.
 * The generated code will be used to render the component by `react-live`.
 * Its required to havee`additionalScope` prop when using packages other than `react` and `@pankod/refine-core`.
 *
 * @param config - Guesser configuration.
 * @param config.type - Guessing type.
 * @param config.additionalScope - Additional scope for live code.
 * @param config.renderer - String renderer for Guesser.
 * @param config.fieldTransformers - Field transformers.
 * @param config.customElements - Field guessers.
 * @param config.codeViewerComponent - Code viewer component.
 * @param config.errorComponent - Error component.
 * @param config.loadingComponent - Loading component.
 */
export const createGuesser: CreateGuesser = ({
    type,
    additionalScope = [],
    customElements = [],
    fieldTransformers = [],
    renderer,
    loadingComponent: LoadingComponent = DefaultLoadingComponent,
    errorComponent: ErrorComponent = DefaultErrorComponent,
    codeViewerComponent: CodeViewerComponent = DefaultCodeViewerComponent,
}) => {
    const guess = composeGuessers([...defaultElements, ...customElements]);
    const transform = composeTransformers([
        ...defaultTransformers,
        ...fieldTransformers,
    ]);

    const Guesser: GuesserResultComponent = ({ name: resourceName }) => {
        const { resource, resources } = useResource({
            resourceNameOrRouteName: resourceName,
        });

        const {
            data: record,
            loading: recordLoading,
            initial: isInitialLoad,
        } = useGuessFetch(type, resourceName ?? resource?.name);

        const rawResults: GuessField[] = React.useMemo(() => {
            if (record) {
                const guessed = Object.keys(record)
                    .map((key) => {
                        const value = record[key];

                        const guessResult = guess(key, value, record, guess);

                        return guessResult;
                    })
                    .filter(Boolean);

                return transform(
                    guessed as GuessField[],
                    resources,
                    resource,
                    record,
                    guess,
                );
            }

            return [];
        }, [record, resources, resource]);

        const {
            fields: results,
            loading: relationLoading,
            // initial: relationInitial,
        } = useRelationFetch({
            record,
            fields: rawResults,
            guess,
        });

        const code = React.useMemo(() => {
            return renderer({ resource, resources, fields: results, guess });
        }, [resource, resources, results]);

        return (
            <>
                {LoadingComponent && (recordLoading || relationLoading) && (
                    <LoadingComponent />
                )}
                {!recordLoading && !relationLoading && (
                    <>
                        <LiveComponent
                            fetchError={
                                !recordLoading && !isInitialLoad && !record
                            }
                            code={prepareLiveCode(
                                code,
                                componentName(resource.name, type),
                            )}
                            errorComponent={ErrorComponent}
                            additionalScope={additionalScope}
                        />
                        {CodeViewerComponent && (
                            <CodeViewerComponent
                                code={removeHiddenCode(code)}
                                loading={recordLoading || relationLoading}
                                resourceName={resourceName}
                                type={type}
                            />
                        )}
                    </>
                )}
            </>
        );
    };

    return Guesser;
};

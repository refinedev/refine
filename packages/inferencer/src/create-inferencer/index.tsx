import React from "react";
import { useResource } from "@pankod/refine-core";

import {
    CreateInferencer,
    InferencerResultComponent,
    InferField,
} from "@/types";

import { composeInferencers } from "@/compose-inferencers";
import { composeTransformers } from "@/compose-transformers";

import { defaultElements } from "@/field-inferencers";
import { defaultTransformers } from "@/field-transformers";

import {
    LiveComponent,
    LoadingComponent as DefaultLoadingComponent,
    ErrorComponent as DefaultErrorComponent,
    CodeViewerComponent as DefaultCodeViewerComponent,
} from "@/components";

import { useInferFetch } from "@/use-infer-fetch";
import { useRelationFetch } from "@/use-relation-fetch";

import { prepareLiveCode, componentName, removeHiddenCode } from "@/utilities";

/**
 * CreateInferencer is a function that creates a Inferencer component.
 *
 * Inferencer will handle the data fetching and the infering parts,
 * then it will invoke the `renderer` function to generate the code.
 * The generated code will be used to render the component by `react-live`.
 * Its required to havee`additionalScope` prop when using packages other than `react` and `@pankod/refine-core`.
 *
 * @param config - Inferencer configuration.
 * @param config.type - Infering type.
 * @param config.additionalScope - Additional scope for live code.
 * @param config.renderer - String renderer for Inferencer.
 * @param config.fieldTransformers - Field transformers.
 * @param config.customElements - Field inferencers.
 * @param config.codeViewerComponent - Code viewer component.
 * @param config.errorComponent - Error component.
 * @param config.loadingComponent - Loading component.
 */
export const createInferencer: CreateInferencer = ({
    type,
    additionalScope = [],
    customElements = [],
    fieldTransformers = [],
    renderer,
    loadingComponent: LoadingComponent = DefaultLoadingComponent,
    errorComponent: ErrorComponent = DefaultErrorComponent,
    codeViewerComponent: CodeViewerComponent = DefaultCodeViewerComponent,
}) => {
    const infer = composeInferencers([...defaultElements, ...customElements]);
    const transform = composeTransformers([
        ...defaultTransformers,
        ...fieldTransformers,
    ]);

    const Inferencer: InferencerResultComponent = ({ name: resourceName }) => {
        const { resource, resources } = useResource({
            resourceNameOrRouteName: resourceName,
        });

        const {
            data: record,
            loading: recordLoading,
            initial: isInitialLoad,
        } = useInferFetch(type, resourceName ?? resource?.name);

        const rawResults: InferField[] = React.useMemo(() => {
            if (record) {
                const inferred = Object.keys(record)
                    .map((key) => {
                        const value = record[key];

                        const inferResult = infer(key, value, record, infer);

                        return inferResult;
                    })
                    .filter(Boolean);

                return transform(
                    inferred as InferField[],
                    resources,
                    resource,
                    record,
                    infer,
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
            infer,
        });

        const code = React.useMemo(() => {
            return renderer({ resource, resources, fields: results, infer });
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

    return Inferencer;
};

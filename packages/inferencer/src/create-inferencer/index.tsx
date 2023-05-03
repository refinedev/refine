import React from "react";
import { useResource } from "@refinedev/core";

import {
    CreateInferencer,
    InferencerComponentProps,
    InferencerResultComponent,
    InferField,
} from "@/types";

import { composeInferencers } from "@/compose-inferencers";
import { composeTransformers } from "@/compose-transformers";

import { defaultElements } from "@/field-inferencers";
import { defaultTransformers } from "@/field-transformers";
import { LiveComponent } from "@/components";
import { useInferFetch } from "@/use-infer-fetch";
import { useRelationFetch } from "@/use-relation-fetch";

import { prepareLiveCode, componentName, removeHiddenCode } from "@/utilities";

/**
 * CreateInferencer is a function that creates a Inferencer component.
 *
 * Inferencer will handle the data fetching and the infering parts,
 * then it will invoke the `renderer` function to generate the code.
 * The generated code will be used to render the component by `react-live`.
 * Its required to havee`additionalScope` prop when using packages other than `react` and `@refinedev/core`.
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
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    codeViewerComponent: CodeViewerComponent,
}) => {
    const infer = composeInferencers([...defaultElements, ...customElements]);
    const transform = composeTransformers([
        ...defaultTransformers,
        ...fieldTransformers,
    ]);

    const Inferencer = ({
        resourceName,
        fieldTransformer,
        hideCodeViewerInProduction,
        meta,
        id,
    }: {
        resourceName?: string;
        hideCodeViewerInProduction?: boolean;
        fieldTransformer?: InferencerComponentProps["fieldTransformer"];
        meta?: InferencerComponentProps["meta"];
        id?: string | number;
    }) => {
        const { resource, resources } = useResource(resourceName);

        const { resource: resourceFromURL } = useResource();

        const {
            data: record,
            loading: recordLoading,
            initial: isInitialLoad,
            error: inferError,
        } = useInferFetch(type, resourceName ?? resource?.name, id, meta);

        const rawResults: InferField[] = React.useMemo(() => {
            if (record) {
                const inferred = Object.keys(record)
                    .map((key) => {
                        const value = record[key];

                        const inferResult = infer(key, value, record, infer);

                        return inferResult;
                    })
                    .filter(Boolean);

                if (resource) {
                    const transformed = transform(
                        inferred as InferField[],
                        resources,
                        resource,
                        record,
                        infer,
                    );

                    const customTransformedFields = fieldTransformer
                        ? transformed.flatMap((field) => {
                              const result = fieldTransformer(field);

                              return result ? [result] : [];
                          })
                        : transformed;

                    return customTransformedFields;
                }

                return [];
            }

            return [];
        }, [record, resources, resource, fieldTransformer]);

        const {
            fields: results,
            loading: relationLoading,
            // initial: relationInitial,
        } = useRelationFetch({
            record,
            fields: rawResults,
            infer,
            meta,
        });

        const clearedFields = React.useMemo(() => {
            const cleanFields: InferField[] = [];

            results.forEach((f, idx, arr) => {
                if (f.resource) {
                    if (
                        cleanFields.findIndex(
                            (el) => el.resource?.name === f.resource?.name,
                        ) > -1
                    ) {
                        return;
                    }
                    const duplicates = arr.filter((field, index) => {
                        if (index !== idx) {
                            const currentFieldHasResource = f.resource;
                            const fieldHasResource = field.resource;
                            const hasAnyIdentifier =
                                field.resource?.identifier ||
                                f.resource?.identifier;
                            const isSameResource = hasAnyIdentifier
                                ? field.resource?.identifier ===
                                  f.resource?.identifier
                                : field.resource?.name === f.resource?.name;

                            return (
                                currentFieldHasResource &&
                                fieldHasResource &&
                                isSameResource
                            );
                        } else {
                            return false;
                        }
                    });
                    if (duplicates.length > 0) {
                        if (type === "create" || type === "edit") {
                            let toPush: InferField | undefined = undefined;

                            [f, ...duplicates].find((el) => {
                                if (
                                    el.fieldable !== true &&
                                    toPush === undefined
                                ) {
                                    toPush = el;
                                }
                            });
                            if (toPush) {
                                cleanFields.push(toPush);
                            } else {
                                cleanFields.push(f);
                            }
                        } else {
                            let toPush: InferField | undefined = undefined;

                            [f, ...duplicates].find((el) => {
                                if (
                                    el.fieldable !== false &&
                                    toPush === undefined
                                ) {
                                    toPush = el;
                                }
                            });

                            if (toPush) {
                                cleanFields.push(toPush);
                            } else {
                                cleanFields.push(f);
                            }
                        }
                    } else {
                        cleanFields.push(f);
                    }
                } else {
                    cleanFields.push(f);
                }
            });

            return cleanFields;
        }, [results, type]);

        const code = React.useMemo(() => {
            if (
                !recordLoading &&
                !relationLoading &&
                !isInitialLoad &&
                resource
            ) {
                return renderer({
                    resource,
                    resources,
                    fields: clearedFields,
                    infer,
                    meta,
                    isCustomPage: resource.name !== resourceFromURL?.name,
                    id,
                });
            }
            return "";
        }, [
            resource,
            resources,
            clearedFields,
            recordLoading,
            relationLoading,
        ]);

        const hiddenCodeViewer =
            process.env.NODE_ENV !== "development" &&
            hideCodeViewerInProduction;

        return (
            <>
                {LoadingComponent && (recordLoading || relationLoading) && (
                    <LoadingComponent />
                )}
                {!recordLoading && !relationLoading && (
                    <>
                        <LiveComponent
                            fetchError={
                                !recordLoading && inferError
                                    ? inferError
                                    : !recordLoading &&
                                      !isInitialLoad &&
                                      !record
                            }
                            code={prepareLiveCode(
                                code,
                                componentName(
                                    resource?.meta?.label ??
                                        resource?.options?.label ??
                                        resource?.label ??
                                        resource?.name ??
                                        "Resource",
                                    type,
                                ),
                            )}
                            errorComponent={ErrorComponent}
                            additionalScope={additionalScope}
                        />
                        {typeof CodeViewerComponent !== "undefined" &&
                        !hiddenCodeViewer ? (
                            <CodeViewerComponent
                                code={removeHiddenCode(code)}
                                loading={recordLoading || relationLoading}
                            />
                        ) : null}
                    </>
                )}
            </>
        );
    };

    const InferencerComponent: InferencerResultComponent = ({
        name,
        resource,
        fieldTransformer,
        meta,
        hideCodeViewerInProduction,
        id,
    }) => {
        const { resource: resourceItem } = useResource(resource ?? name);

        const key = `${
            resourceItem?.identifier ?? resourceItem?.name
        }-${type}-${id}`;

        return (
            <Inferencer
                hideCodeViewerInProduction={hideCodeViewerInProduction}
                fieldTransformer={fieldTransformer}
                resourceName={resource ?? name}
                meta={meta ?? {}}
                key={key}
                id={id}
            />
        );
    };

    return InferencerComponent;
};

import { useEffect, useState } from "react";
import { ButtonProps, notification, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import {
    useCreate,
    useTranslate,
    useCreateMany,
    useResourceWithRoute,
    useListResourceQueries,
} from "@hooks";
import { useParams } from "react-router-dom";
import {
    MapDataFn,
    BaseRecord,
    HttpError,
    ResourceRouterParams,
    SuccessErrorNotification,
} from "../../interfaces";
import { parse, ParseConfig } from "papaparse";
import { importCSVMapper } from "@definitions";
import chunk from "lodash/chunk";
import { UseCreateReturnType } from "@hooks/data/useCreate";
import { UseCreateManyReturnType } from "@hooks/data/useCreateMany";
import pluralize from "pluralize";
import { useQueryClient } from "react-query";

type ImportOptions<TItem, TVariables = any> = {
    resourceName?: string;
    mapData?: MapDataFn<TItem, TVariables>;
    paparseOptions?: ParseConfig;
    batchSize?: number | null;
};

/**
 * `useImport` hook allows you to handle your csv import logic easily.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/import-export/useImport} for more details.
 *
 * @typeParam TItem - Interface of parsed csv data
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useImport = <
    TItem = any,
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = any,
>({
    resourceName,
    mapData = (item) => item as unknown as TVariables,
    paparseOptions,
    batchSize,
}: ImportOptions<TItem, TVariables> = {}): {
    uploadProps: UploadProps;
    buttonProps: ButtonProps;
    mutationResult:
        | UseCreateReturnType<TData, TError, TVariables>
        | UseCreateManyReturnType<TData, TError, TVariables>;
} => {
    const [processedAmount, setProcessedAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const resourceWithRoute = useResourceWithRoute();
    const getListQueries = useListResourceQueries();
    const queryClient = useQueryClient();
    const t = useTranslate();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);
    const resourceSingular = pluralize.singular(resource);

    const createMany = useCreateMany<TData, TError, TVariables>();
    const create = useCreate<TData, TError, TVariables>();

    let mutationResult;

    if (batchSize === 1) {
        mutationResult = create;
    } else {
        mutationResult = createMany;
    }

    if (resourceName) {
        resource = resourceName;
    }

    useEffect(() => {
        if (totalAmount > 0) {
            notification.open({
                // description: t(
                //     "notifications.createSuccess",
                //     {
                //         resource: t(`${resource}.${resource}`, totalAmount),
                //     },
                //     `Successfully created ${resourceSingular}`,
                // ),
                description: totalAmount,
                // message: t("notifications.success", "Success"),
                message: processedAmount,
                type: "success",
                key: `${resourceName}-import`,
            });

            if (processedAmount >= totalAmount) {
                setTotalAmount(0);
                setProcessedAmount(0);
            }
        }
    }, [totalAmount, processedAmount]);

    const handleChange = ({ file }: UploadChangeParam) => {
        parse(file as unknown as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                const values = importCSVMapper(data, mapData);

                setTotalAmount(values.length);

                if (batchSize === null) {
                    createMany.mutateAsync(
                        {
                            resource,
                            values,
                            successNotification: false,
                            errorNotification: false,
                        },
                        {
                            onSuccess: (_, { resource }) => {
                                console.log(
                                    "useImport onSuccess batchSize = null",
                                );
                                setProcessedAmount(totalAmount);
                            },
                        },
                    );
                } else if (batchSize === 1) {
                    Promise.all(
                        values
                            .map((value) => {
                                return create.mutateAsync(
                                    {
                                        resource,
                                        values: value,
                                        successNotification: false,
                                        errorNotification: false,
                                    },
                                    {
                                        onSuccess: (_, { resource }) => {
                                            console.log(
                                                "useImport onSuccess batchSize = 1",
                                            );
                                        },
                                    },
                                );
                            })
                            .map((mutation) =>
                                mutation.then(() => {
                                    setProcessedAmount(
                                        (currentAmount) => currentAmount + 1,
                                    );
                                }),
                            ),
                    );
                } else {
                    Promise.all(
                        chunk(values, batchSize)
                            .map((batch) => ({
                                mutation: createMany.mutateAsync(
                                    {
                                        resource,
                                        values: batch,
                                        successNotification: false,
                                        errorNotification: false,
                                    },
                                    {
                                        onSuccess: (_, { resource }) => {
                                            console.log(
                                                "useImport onSuccess batchSize > 1",
                                            );
                                        },
                                    },
                                ),
                                currentBatchLength: batch.length,
                            }))
                            .map(({ mutation, currentBatchLength }) =>
                                mutation.then(() => {
                                    setProcessedAmount(
                                        (currentAmount) =>
                                            currentAmount +
                                            (currentBatchLength ?? 0),
                                    );
                                }),
                            ),
                    );
                }
            },
            ...paparseOptions,
        });
    };

    return {
        uploadProps: {
            onChange: handleChange,
            beforeUpload: () => false,
            showUploadList: false,
            accept: ".csv",
        },
        buttonProps: {
            type: "default",
            loading: mutationResult.isLoading,
        },
        mutationResult,
    };
};

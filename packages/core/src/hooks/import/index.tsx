import React from "react";
import { useEffect, useState } from "react";
import { ButtonProps, notification, UploadProps, Progress } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import {
    useCreate,
    useTranslate,
    useCreateMany,
    useResourceWithRoute,
} from "@hooks";
import { useParams } from "react-router-dom";
import {
    MapDataFn,
    BaseRecord,
    HttpError,
    ResourceRouterParams,
    MetaDataQuery,
} from "../../interfaces";
import { parse, ParseConfig } from "papaparse";
import { importCSVMapper } from "@definitions";
import chunk from "lodash/chunk";
import { UseCreateReturnType } from "@hooks/data/useCreate";
import { UseCreateManyReturnType } from "@hooks/data/useCreateMany";

export type ImportSuccessResult<TVariables, TData> = {
    request: TVariables[];
    type: "success";
    response: TData[];
};

export type ImportErrorResult<TVariables> = {
    request: TVariables[];
    type: "error";
    response: HttpError[];
};

export type OnFinishParams<TVariables, TData> = {
    succeeded: ImportSuccessResult<TVariables, TData>[];
    errored: ImportErrorResult<TVariables>[];
};

type ImportOptions<
    TItem,
    TVariables = any,
    TData extends BaseRecord = BaseRecord,
> = {
    resourceName?: string;
    mapData?: MapDataFn<TItem, TVariables>;
    paparseOptions?: ParseConfig;
    batchSize?: number;
    onFinish?: (results: OnFinishParams<TVariables, TData>) => void;
    metaData?: MetaDataQuery;
};

export type CreatedValuesType<TVariables, TData> =
    | ImportSuccessResult<TVariables, TData>
    | ImportErrorResult<TVariables>;

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
    TItem extends unknown = any,
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = any,
>({
    resourceName,
    mapData = (item) => item as unknown as TVariables,
    paparseOptions,
    batchSize = Number.MAX_SAFE_INTEGER,
    onFinish,
    metaData,
}: ImportOptions<TItem, TVariables, TData> = {}): {
    uploadProps: UploadProps;
    buttonProps: ButtonProps;
    mutationResult:
        | UseCreateReturnType<TData, TError, TVariables>
        | UseCreateManyReturnType<TData, TError, TVariables>;
} => {
    const [processedAmount, setProcessedAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslate();
    const resourceWithRoute = useResourceWithRoute();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    const { name: resource } = resourceWithRoute(
        resourceName ?? routeResourceName,
    );

    const createMany = useCreateMany<TData, TError, TVariables>();
    const create = useCreate<TData, TError, TVariables>();

    let mutationResult:
        | UseCreateReturnType<TData, TError, TVariables>
        | UseCreateManyReturnType<TData, TError, TVariables>;

    if (batchSize === 1) {
        mutationResult = create;
    } else {
        mutationResult = createMany;
    }

    const handleCleanup = () => {
        setTotalAmount(0);
        setProcessedAmount(0);
        setIsLoading(false);

        setTimeout(() => {
            notification.close(`${resource}-import`);
        }, 4500);
    };

    const handleFinish = (
        createdValues: CreatedValuesType<TVariables, TData>[],
    ) => {
        const result = {
            succeeded: createdValues.filter(
                (item) => item.type === "success",
            ) as unknown as ImportSuccessResult<TVariables, TData>[],
            errored: createdValues.filter(
                (item) => item.type === "error",
            ) as unknown as ImportErrorResult<TVariables>[],
        };

        handleCleanup();

        onFinish?.(result);
    };

    useEffect(() => {
        if (totalAmount > 0 && processedAmount > 0) {
            const description = (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "-7px",
                    }}
                >
                    <Progress
                        type="circle"
                        percent={Math.floor(
                            (processedAmount / totalAmount) * 100,
                        )}
                        width={50}
                        strokeColor="#1890ff"
                        status="normal"
                    />
                    <span style={{ marginLeft: 8, width: "100%" }}>
                        {t(
                            "notifications.importProgress",
                            {
                                processed: processedAmount,
                                total: totalAmount,
                            },
                            `Importing: ${processedAmount}/${totalAmount}`,
                        )}
                    </span>
                </div>
            );

            notification.open({
                description,
                message: null,
                key: `${resource}-import`,
                duration: 0,
            });

            if (processedAmount >= totalAmount) {
            }
        }
    }, [totalAmount, processedAmount]);

    const handleChange = ({
        file,
    }: UploadChangeParam): Promise<CreatedValuesType<TVariables, TData>[]> => {
        return new Promise<CreatedValuesType<TVariables, TData>[]>(
            (resolve) => {
                setIsLoading(true);
                parse(file as unknown as File, {
                    complete: async ({ data }: { data: unknown[][] }) => {
                        const values = importCSVMapper(data, mapData);

                        setTotalAmount(values.length);

                        if (batchSize === 1) {
                            const createdValues = await Promise.all(
                                values
                                    .map((value) => {
                                        const response = create.mutateAsync({
                                            resource,
                                            values: value,
                                            successNotification: false,
                                            errorNotification: false,
                                            metaData,
                                        });

                                        return { response, value };
                                    })
                                    .map(({ response, value }) =>
                                        response
                                            .then(({ data }) => {
                                                setProcessedAmount(
                                                    (currentAmount) =>
                                                        currentAmount + 1,
                                                );

                                                return {
                                                    response: [data],
                                                    type: "success",
                                                    request: [value],
                                                } as ImportSuccessResult<
                                                    TVariables,
                                                    TData
                                                >;
                                            })
                                            .catch(
                                                (error: HttpError) =>
                                                    ({
                                                        response: [error],
                                                        type: "error",
                                                        request: [value],
                                                    } as ImportErrorResult<TVariables>),
                                            ),
                                    ),
                            );

                            resolve(createdValues);
                            handleFinish(createdValues);
                        } else {
                            const createdValues = await Promise.all(
                                chunk(values, batchSize)
                                    .map((batch) => {
                                        return {
                                            response: createMany.mutateAsync({
                                                resource,
                                                values: batch,
                                                successNotification: false,
                                                errorNotification: false,
                                                metaData,
                                            }),
                                            currentBatchLength: batch.length,
                                            value: batch,
                                        };
                                    })
                                    .map(
                                        ({
                                            response,
                                            value,
                                            currentBatchLength,
                                        }) =>
                                            response
                                                .then((response) => {
                                                    setProcessedAmount(
                                                        (currentAmount) =>
                                                            currentAmount +
                                                            currentBatchLength,
                                                    );

                                                    return {
                                                        response: response.data,
                                                        type: "success",
                                                        request: value,
                                                    } as ImportSuccessResult<
                                                        TVariables,
                                                        TData
                                                    >;
                                                })
                                                .catch(
                                                    (error: HttpError) =>
                                                        ({
                                                            response: [error],
                                                            type: "error",
                                                            request: value,
                                                        } as ImportErrorResult<TVariables>),
                                                ),
                                    ),
                            );

                            resolve(createdValues);
                            handleFinish(createdValues);
                        }
                    },

                    ...paparseOptions,
                });
            },
        ).then((createdValues) => {
            handleFinish(createdValues);
            return createdValues;
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
            loading: isLoading,
        },
        mutationResult,
    };
};

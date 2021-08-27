/* eslint-disable react/display-name */
import React from "react";
import { useEffect, useState } from "react";
import { ButtonProps, notification, UploadProps, Progress, Button } from "antd";
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
} from "../../interfaces";
import { parse, ParseConfig } from "papaparse";
import { importCSVMapper } from "@definitions";
import chunk from "lodash/chunk";
import { UseCreateReturnType } from "@hooks/data/useCreate";
import { UseCreateManyReturnType } from "@hooks/data/useCreateMany";
import pluralize from "pluralize";

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
    TItem extends unknown = any,
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
    const t = useTranslate();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);

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
                                processedAmount,
                                totalAmount,
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
            });

            if (processedAmount >= totalAmount) {
                setTimeout(() => {
                    setTotalAmount(0);
                    setProcessedAmount(0);
                    notification.close(`${resource}-import`);
                }, 1000);
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
                            onSuccess: () => {
                                setProcessedAmount(totalAmount);
                            },
                        },
                    );
                } else if (batchSize === 1) {
                    Promise.all(
                        values
                            .map((value) => {
                                return create.mutateAsync({
                                    resource,
                                    values: value,
                                    successNotification: false,
                                    errorNotification: false,
                                });
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
                                mutation: createMany.mutateAsync({
                                    resource,
                                    values: batch,
                                    successNotification: false,
                                    errorNotification: false,
                                }),
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

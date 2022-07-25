import { useEffect, useState } from "react";
import { parse, ParseConfig } from "papaparse";
import chunk from "lodash/chunk";

import {
    useCreate,
    useCreateMany,
    useResourceWithRoute,
    useRouterContext,
} from "@hooks";
import {
    MapDataFn,
    BaseRecord,
    HttpError,
    ResourceRouterParams,
    MetaDataQuery,
} from "../../interfaces";
import { importCSVMapper } from "@definitions";
import { UseCreateReturnType } from "../../hooks/data/useCreate";
import { UseCreateManyReturnType } from "../../hooks/data/useCreateMany";

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

export type OnProgressParams = {
    totalAmount: number;
    processedAmount: number;
};

export type ImportOptions<
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
    onProgress?: (onProgressParams: OnProgressParams) => void;
    dataProviderName?: string;
};

export type CreatedValuesType<TVariables, TData> =
    | ImportSuccessResult<TVariables, TData>
    | ImportErrorResult<TVariables>;

export type HandleChangeType<TVariables, TData> = (onChangeParams: {
    file: Partial<File>;
}) => Promise<CreatedValuesType<TVariables, TData>[]>;

export type UseImportInputPropsType = {
    type: "file";
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type UseImportReturnType<
    TData extends BaseRecord = BaseRecord,
    TVariables = {},
    TError extends HttpError = HttpError,
> = {
    inputProps: UseImportInputPropsType;
    mutationResult:
        | UseCreateReturnType<TData, TError, TVariables>
        | UseCreateManyReturnType<TData, TError, TVariables>;
    isLoading: boolean;
    handleChange: HandleChangeType<TVariables, TData>;
};

/**
 * `useImport` hook allows you to handle your csv import logic easily.
 *
 * @see {@link https://refine.dev/docs/core/hooks/import-export/useImport} for more details.
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
    onProgress,
}: ImportOptions<TItem, TVariables, TData> = {}): UseImportReturnType<
    TData,
    TVariables,
    TError
> => {
    const [processedAmount, setProcessedAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const resourceWithRoute = useResourceWithRoute();
    const { useParams } = useRouterContext();

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

        onFinish?.(result);
        setIsLoading(false);
    };

    useEffect(() => {
        onProgress?.({ totalAmount, processedAmount });
    }, [totalAmount, processedAmount]);

    const handleChange: HandleChangeType<TVariables, TData> = ({ file }) => {
        handleCleanup();
        return new Promise<CreatedValuesType<TVariables, TData>[]>(
            (resolve) => {
                setIsLoading(true);
                parse(file as any, {
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
                                                    (currentAmount) => {
                                                        return (
                                                            currentAmount + 1
                                                        );
                                                    },
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
                                                        (currentAmount) => {
                                                            return (
                                                                currentAmount +
                                                                currentBatchLength
                                                            );
                                                        },
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
        inputProps: {
            type: "file",
            accept: ".csv",
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files.length > 0) {
                    handleChange({ file: event.target.files[0] });
                }
            },
        },
        mutationResult,
        isLoading,
        handleChange,
    };
};

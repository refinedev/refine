import { ButtonProps, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useCreate, useCreateMany, useResourceWithRoute } from "@hooks";
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

type ImportOptions<TItem, TVariables = any> = {
    resourceName?: string;
    mapData?: MapDataFn<TItem, TVariables>;
    paparseOptions?: ParseConfig;
    batchSize?: number | null;
} & SuccessErrorNotification;

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
    successNotification,
    errorNotification,
}: ImportOptions<TItem, TVariables> = {}): {
    uploadProps: UploadProps;
    buttonProps: ButtonProps;
    mutationResult:
        | UseCreateReturnType<TData, TError, TVariables>
        | UseCreateManyReturnType<TData, TError, TVariables>;
} => {
    const resourceWithRoute = useResourceWithRoute();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    let { name: resource } = resourceWithRoute(routeResourceName);

    const createManyMutationResult = useCreateMany<TData, TError, TVariables>();
    const createMutationResult = useCreate<TData, TError, TVariables>();

    let mutationResult;

    if (batchSize === 1) {
        mutationResult = createMutationResult;
    } else {
        mutationResult = createManyMutationResult;
    }

    if (resourceName) {
        resource = resourceName;
    }

    const handleChange = ({ file }: UploadChangeParam) => {
        parse(file as unknown as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                const values = importCSVMapper(data, mapData);

                if (batchSize === null) {
                    createManyMutationResult.mutate({
                        resource,
                        values,
                        successNotification,
                        errorNotification,
                    });
                } else if (batchSize === 1) {
                    values.forEach((value) => {
                        createMutationResult.mutate({
                            resource,
                            values: value,
                        });
                    });
                } else {
                    chunk(values, batchSize).forEach((batch) => {
                        createManyMutationResult.mutate({
                            resource,
                            values: batch,
                            successNotification,
                            errorNotification,
                        });
                    });
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

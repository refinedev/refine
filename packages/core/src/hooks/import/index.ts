import { ButtonProps, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useCreate, useCreateMany, useResourceWithRoute } from "@hooks";
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

type ImportOptions<TItem, TVariables = any> = {
    resourceName?: string;
    mapData?: MapDataFn<TItem, TVariables>;
    paparseOptions?: ParseConfig;
    batchSize?: number | null;
};

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
    const resourceWithRoute = useResourceWithRoute();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    let { name: resource } = resourceWithRoute(routeResourceName);

    const createManyMutationResult = useCreateMany<TData, TError, TVariables>();
    const createMutaitonResult = useCreate<TData, TError, TVariables>();

    let mutationResult;

    if (batchSize === 1) {
        mutationResult = createMutaitonResult;
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
                    });
                } else if (batchSize === 1) {
                    values.forEach((value) => {
                        createMutaitonResult.mutate({
                            resource,
                            values: value,
                        });
                    });
                } else {
                    chunk(values, batchSize).forEach((batch) => {
                        createManyMutationResult.mutate({
                            resource,
                            values: batch,
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

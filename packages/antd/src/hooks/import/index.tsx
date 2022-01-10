import React from "react";
import { ButtonProps, notification, UploadProps, Progress } from "antd";
import {
    useTranslate,
    useResourceWithRoute,
    useRouterContext,
    BaseRecord,
    HttpError,
    ResourceRouterParams,
    useImport as useImportCore,
    UseImportReturnType,
    ImportOptions as ImportOptionsCore,
} from "@pankod/refine-core";

type ImportOptions<
    TItem,
    TVariables = any,
    TData extends BaseRecord = BaseRecord,
> = Omit<ImportOptionsCore<TItem, TVariables, TData>, "onProgress">;

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
    onFinish: onFinishFromProps,
    metaData,
}: ImportOptions<TItem, TVariables, TData> = {}): Omit<
    UseImportReturnType<TData, TVariables, TError>,
    "handleChange"
> & {
    uploadProps: UploadProps;
    buttonProps: ButtonProps;
} => {
    const t = useTranslate();

    const resourceWithRoute = useResourceWithRoute();
    const { useParams } = useRouterContext();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    const { name: resource } = resourceWithRoute(
        resourceName ?? routeResourceName,
    );

    const { mutationResult, isLoading, handleChange } = useImportCore<
        TItem,
        TData,
        TError,
        TVariables
    >({
        resourceName,
        mapData,
        paparseOptions,
        batchSize,
        metaData,
        onFinish: (onFinishParams) => {
            onFinishFromProps?.(onFinishParams);

            console.log("onfinish");
            setTimeout(() => {
                notification.close(`${resource}-import`);
            }, 4500);
        },
        onProgress: ({ totalAmount, processedAmount }) => {
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
        },
    });

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
        isLoading,
    };
};

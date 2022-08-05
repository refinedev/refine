import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useDataProvider, useHandleNotification, useTranslate } from "@hooks";
import {
    CreateResponse,
    BaseRecord,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";

interface UseCustomMutationConfig {
    headers?: {};
}

type useCustomMutationParams<TVariables> = {
    url: string;
    method: "post" | "put" | "patch" | "delete";
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    config?: UseCustomMutationConfig;
} & SuccessErrorNotification;

export type UseCustomMutationReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TVariables>,
    unknown
>;

/**
 * `useCustomMutation` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCustomMutation} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCustomMutation = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCustomMutationReturnType<TData, TError, TVariables> => {
    const handleNotification = useHandleNotification();
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        useCustomMutationParams<TVariables>,
        unknown
    >(
        ({
            url,
            method,
            values,
            metaData,
            dataProviderName,
            config,
        }: useCustomMutationParams<TVariables>) => {
            const { custom } = dataProvider(dataProviderName);

            if (custom) {
                return custom<TData>({
                    url,
                    method,
                    payload: values,
                    metaData,
                    headers: { ...config?.headers },
                });
            }

            throw Error("Not implemented custom on data provider.");
        },
        {
            onSuccess: (
                data,
                {
                    successNotification: successNotificationFromProp,
                    config,
                    metaData,
                },
            ) => {
                const notificationConfig =
                    typeof successNotificationFromProp === "function"
                        ? successNotificationFromProp(data, {
                              ...config,
                              ...metaData,
                          })
                        : successNotificationFromProp;

                handleNotification(notificationConfig);
            },
            onError: (
                err: TError,
                {
                    errorNotification: errorNotificationFromProp,
                    method,
                    config,
                    metaData,
                },
            ) => {
                const notificationConfig =
                    typeof errorNotificationFromProp === "function"
                        ? errorNotificationFromProp(err, {
                              ...config,
                              ...metaData,
                          })
                        : errorNotificationFromProp;

                handleNotification(notificationConfig, {
                    key: `${method}-notification`,
                    message: translate(
                        "common:notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
        },
    );

    return mutation;
};

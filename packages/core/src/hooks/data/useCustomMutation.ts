import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import {
    useCheckError,
    useDataProvider,
    useHandleNotification,
    useTranslate,
} from "@hooks";
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

export type UseCustomMutationProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            CreateResponse<TData>,
            TError,
            useCustomMutationParams<TVariables>,
            unknown
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

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
>({
    mutationOptions,
}: UseCustomMutationProps<
    TData,
    TError,
    TVariables
> = {}): UseCustomMutationReturnType<TData, TError, TVariables> => {
    const { mutate: checkError } = useCheckError();
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
                checkError(err);

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
            ...mutationOptions,
        },
    );

    return mutation;
};

import { useMutation, UseMutationResult } from "@tanstack/react-query";

import {
    BaseRecord,
    CreateManyResponse,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useTranslate,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useInvalidate,
} from "@hooks";
import pluralize from "pluralize";

type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;

export type UseCreateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateManyResponse<TData>,
    TError,
    useCreateManyParams<TVariables>,
    unknown
>;

/**
 * `useCreateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple create mutations.
 *
 * It uses `createMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useCreateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useCreateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateManyReturnType<TData, TError, TVariables> => {
    const dataProvider = useDataProvider();

    const translate = useTranslate();
    const publish = usePublish();
    const handleNotification = useHandleNotification();
    const invalidateStore = useInvalidate();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        useCreateManyParams<TVariables>
    >(
        ({
            resource,
            values,
            metaData,
            dataProviderName,
        }: useCreateManyParams<TVariables>) =>
            dataProvider(dataProviderName).createMany<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            }),
        {
            onSuccess: (
                response,
                {
                    resource,
                    successNotification,
                    dataProviderName,
                    invalidates = ["list", "many"],
                    values,
                },
            ) => {
                const resourcePlural = pluralize.plural(resource);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(response, values, resource)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `createMany-${resource}-notification`,
                    message: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                        },
                        `Successfully created ${resourcePlural}`,
                    ),
                    description: translate("notifications.success", "Success"),
                    type: "success",
                });

                invalidateStore({
                    resource,
                    dataProviderName,
                    invalidates,
                });

                const ids = response?.data
                    .filter((item) => item?.id !== undefined)
                    .map((item) => item.id!);

                publish?.({
                    channel: `resources/${resource}`,
                    type: "created",
                    payload: {
                        ids,
                    },
                    date: new Date(),
                });
            },
            onError: (err: TError, { resource, errorNotification, values }) => {
                const notificationConfig =
                    typeof errorNotification === "function"
                        ? errorNotification(err, values, resource)
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `createMany-${resource}-notification`,
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resource} (status code: ${err.statusCode}`,
                    ),
                    type: "error",
                });
            },
        },
    );

    return mutation;
};

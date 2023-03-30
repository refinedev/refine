import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import pluralize from "pluralize";

import {
    BaseRecord,
    CreateManyResponse,
    HttpError,
    SuccessErrorNotification,
    MetaQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useResource,
    useTranslate,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useInvalidate,
    useLog,
} from "@hooks";
import {
    handleMultiple,
    pickDataProvider,
    pickNotDeprecated,
} from "@definitions";

type useCreateManyParams<TData, TError, TVariables> = {
    resource: string;
    values: TVariables[];
    meta?: MetaQuery;
    metaData?: MetaQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<CreateManyResponse<TData>, TError, TVariables[]>;

export type UseCreateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateManyResponse<TData>,
    TError,
    useCreateManyParams<TData, TError, TVariables>,
    unknown
>;

export type UseCreateManyProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            CreateManyResponse<TData>,
            TError,
            useCreateManyParams<TData, TError, TVariables>
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

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
>({
    mutationOptions,
}: UseCreateManyProps<TData, TError, TVariables> = {}): UseCreateManyReturnType<
    TData,
    TError,
    TVariables
> => {
    const dataProvider = useDataProvider();

    const { resources } = useResource();
    const translate = useTranslate();
    const publish = usePublish();
    const handleNotification = useHandleNotification();
    const invalidateStore = useInvalidate();
    const { log } = useLog();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        useCreateManyParams<TData, TError, TVariables>
    >(
        ({
            resource,
            values,
            meta,
            metaData,
            dataProviderName,
        }: useCreateManyParams<TData, TError, TVariables>) => {
            const selectedDataProvider = dataProvider(
                pickDataProvider(resource, dataProviderName, resources),
            );

            if (selectedDataProvider.createMany) {
                return selectedDataProvider.createMany<TData, TVariables>({
                    resource,
                    variables: values,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                });
            } else {
                return handleMultiple(
                    values.map((val) =>
                        selectedDataProvider.create<TData, TVariables>({
                            resource,
                            variables: val,
                            meta: pickNotDeprecated(meta, metaData),
                            metaData: pickNotDeprecated(meta, metaData),
                        }),
                    ),
                );
            }
        },
        {
            onSuccess: (
                response,
                {
                    resource,
                    successNotification,
                    dataProviderName,
                    invalidates = ["list", "many"],
                    values,
                    meta,
                    metaData,
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
                    dataProviderName: pickDataProvider(
                        resource,
                        dataProviderName,
                        resources,
                    ),
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

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "createMany",
                    resource,
                    data: values,
                    meta: {
                        dataProviderName: pickDataProvider(
                            resource,
                            dataProviderName,
                            resources,
                        ),
                        ids,
                        ...rest,
                    },
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
            ...mutationOptions,
        },
    );

    return mutation;
};

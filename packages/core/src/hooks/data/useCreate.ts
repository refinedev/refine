import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import pluralize from "pluralize";
import { pickDataProvider } from "@definitions/helpers";

import {
    CreateResponse,
    BaseRecord,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useResource,
    useTranslate,
    useCheckError,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useLog,
    useInvalidate,
} from "@hooks";

type useCreateParams<TVariables> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Values for mutation function
     */
    values: TVariables;
    /**
     *  Metadata query for `dataProvider`
     */
    metaData?: MetaDataQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
    /**
     * You can use it to manage the invalidations that will occur at the end of the mutation.
     */
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;

export type UseCreateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCreateParams<TVariables>,
    unknown
>;

export type UseCreateProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            CreateResponse<TData>,
            TError,
            useCreateParams<TVariables>,
            unknown
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

/**
 * `useCreate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCreate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationOptions,
}: UseCreateProps<TData, TError, TVariables> = {}): UseCreateReturnType<
    TData,
    TError,
    TVariables
> => {
    const { mutate: checkError } = useCheckError();
    const dataProvider = useDataProvider();
    const invalidateStore = useInvalidate();

    const { resources } = useResource();

    const translate = useTranslate();
    const publish = usePublish();
    const { log } = useLog();
    const handleNotification = useHandleNotification();

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        useCreateParams<TVariables>,
        unknown
    >(
        ({
            resource,
            values,
            metaData,
            dataProviderName,
        }: useCreateParams<TVariables>) => {
            return dataProvider(
                pickDataProvider(resource, dataProviderName, resources),
            ).create<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            });
        },
        {
            onSuccess: (
                data,
                {
                    resource,
                    successNotification: successNotificationFromProp,
                    dataProviderName,
                    invalidates = ["list", "many"],
                    values,
                    metaData,
                },
            ) => {
                const resourceSingular = pluralize.singular(resource);

                const notificationConfig =
                    typeof successNotificationFromProp === "function"
                        ? successNotificationFromProp(data, values, resource)
                        : successNotificationFromProp;

                handleNotification(notificationConfig, {
                    key: `create-${resource}-notification`,
                    message: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully created ${resourceSingular}`,
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

                publish?.({
                    channel: `resources/${resource}`,
                    type: "created",
                    payload: {
                        ids: data?.data?.id ? [data.data.id] : undefined,
                    },
                    date: new Date(),
                });

                const { fields, operation, variables, ...rest } =
                    metaData || {};

                log?.mutate({
                    action: "create",
                    resource,
                    data: values,
                    meta: {
                        dataProviderName: pickDataProvider(
                            resource,
                            dataProviderName,
                            resources,
                        ),
                        id: data?.data?.id ?? undefined,
                        ...rest,
                    },
                });
            },
            onError: (
                err: TError,
                {
                    resource,
                    errorNotification: errorNotificationFromProp,
                    values,
                },
            ) => {
                checkError(err);
                const resourceSingular = pluralize.singular(resource);

                const notificationConfig =
                    typeof errorNotificationFromProp === "function"
                        ? errorNotificationFromProp(err, values, resource)
                        : errorNotificationFromProp;

                handleNotification(notificationConfig, {
                    key: `create-${resource}-notification`,
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                    type: "error",
                });
            },
            ...mutationOptions,
        },
    );

    return mutation;
};

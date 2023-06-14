import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import pluralize from "pluralize";
import {
    pickDataProvider,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions/helpers";

import {
    CreateResponse,
    BaseRecord,
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
    useLog,
    useInvalidate,
    useOnError,
    useMeta,
    useRouterType,
} from "@hooks";
import { getResourceByName } from "@definitions/helpers/getResourceByName";

type useCreateParams<TData, TError, TVariables> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Values for mutation function
     */
    values: TVariables;
    /**
     * Meta data for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     * Meta data for `dataProvider`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
    /**
     * You can use it to manage the invalidations that will occur at the end of the mutation.
     */
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<CreateResponse<TData>, TError, TVariables>;

export type UseCreateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCreateParams<TData, TError, TVariables>,
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
            useCreateParams<TData, TError, TVariables>,
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
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
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
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const dataProvider = useDataProvider();
    const invalidateStore = useInvalidate();
    const { resources } = useResource();
    const translate = useTranslate();
    const publish = usePublish();
    const { log } = useLog();
    const handleNotification = useHandleNotification();
    const getMeta = useMeta();
    const routerType = useRouterType();

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        useCreateParams<TData, TError, TVariables>,
        unknown
    >(
        ({
            resource: resourceName,
            values,
            meta,
            metaData,
            dataProviderName,
        }: useCreateParams<TData, TError, TVariables>) => {
            const resource = getResourceByName(
                resourceName,
                resources,
                routerType,
            );

            const resourceIdentifierOrName =
                resource.identifier ?? resource.name;

            const combinedMeta = getMeta({
                resource,
                meta: pickNotDeprecated(meta, metaData),
            });

            return dataProvider(
                pickDataProvider(
                    resourceIdentifierOrName,
                    dataProviderName,
                    resources,
                ),
            ).create<TData, TVariables>({
                resource: resource.name,
                variables: values,
                meta: combinedMeta,
                metaData: combinedMeta,
            });
        },
        {
            onSuccess: (
                data,
                {
                    resource: resourceName,
                    successNotification: successNotificationFromProp,
                    dataProviderName,
                    invalidates = ["list", "many"],
                    values,
                    meta,
                    metaData,
                },
            ) => {
                const resource = getResourceByName(
                    resourceName,
                    resources,
                    routerType,
                );

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                const resourceSingular = pluralize.singular(
                    resourceIdentifierOrName,
                );

                const notificationConfig =
                    typeof successNotificationFromProp === "function"
                        ? successNotificationFromProp(
                              data,
                              values,
                              resourceIdentifierOrName,
                          )
                        : successNotificationFromProp;

                handleNotification(notificationConfig, {
                    key: `create-${resourceIdentifierOrName}-notification`,
                    message: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resourceIdentifierOrName}.${resourceIdentifierOrName}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully created ${resourceSingular}`,
                    ),
                    description: translate("notifications.success", "Success"),
                    type: "success",
                });

                invalidateStore({
                    resource: resourceIdentifierOrName,
                    dataProviderName: pickDataProvider(
                        resourceIdentifierOrName,
                        dataProviderName,
                        resources,
                    ),
                    invalidates,
                });

                publish?.({
                    channel: `resources/${resource.name}`,
                    type: "created",
                    payload: {
                        ids: data?.data?.id ? [data.data.id] : undefined,
                    },
                    date: new Date(),
                });

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "create",
                    resource: resource.name,
                    data: values,
                    meta: {
                        dataProviderName: pickDataProvider(
                            resourceIdentifierOrName,
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
                    resource: resourceName,
                    errorNotification: errorNotificationFromProp,
                    values,
                },
            ) => {
                checkError(err);

                const resource = getResourceByName(
                    resourceName,
                    resources,
                    routerType,
                );

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                const resourceSingular = pluralize.singular(
                    resourceIdentifierOrName,
                );

                const notificationConfig =
                    typeof errorNotificationFromProp === "function"
                        ? errorNotificationFromProp(
                              err,
                              values,
                              resourceIdentifierOrName,
                          )
                        : errorNotificationFromProp;

                handleNotification(notificationConfig, {
                    key: `create-${resourceIdentifierOrName}-notification`,
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resourceIdentifierOrName}.${resourceIdentifierOrName}`,
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

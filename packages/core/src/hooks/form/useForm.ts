import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import warnOnce from "warn-once";

import {
    useResourceWithRoute,
    useRouterContext,
    useWarnAboutChange,
    useCreate,
    useUpdate,
    useRedirectionAfterSubmission,
    useMutationMode,
    useOne,
    useRefineContext,
} from "@hooks";

import {
    BaseRecord,
    CreateResponse,
    GetOneResponse,
    HttpError,
    LiveModeProps,
    ResourceRouterParams,
    RedirectAction,
    SuccessErrorNotification,
    UpdateResponse,
    MutationMode,
    BaseKey,
    IQueryKeys,
    FormAction,
    IResourceItem,
    MetaQuery,
} from "../../interfaces";
import {
    UpdateParams,
    UseUpdateProps,
    UseUpdateReturnType,
} from "../data/useUpdate";
import { UseCreateProps, UseCreateReturnType } from "../data/useCreate";
import { redirectPage } from "@definitions/helpers";
import { useRouterType } from "@contexts/router-picker";
import { useParsed } from "@hooks/router/use-parsed";
import { pickResource } from "@definitions/helpers/pick-resource";
import { useResource } from "../resource/useResource";
import { pickNotDeprecated } from "@definitions/helpers";

export type ActionParams = {
    /**
     * Type of the form mode
     * @default Action that it reads from route otherwise "create" is used
     */
    action?: FormAction;
};

type ActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     */
    resource?: string;
    /**
     * Record id for fetching
     * @default Id that it reads from the URL
     */
    id?: BaseKey;
    /**
     * Page to redirect after a succesfull mutation
     * @type `"show" | "edit" | "list" | "create" | false`
     * @default `"list"`
     */
    redirect?: RedirectAction;
    /**
     * Metadata query for dataProvider
     */
    meta?: MetaQuery;
    /**
     * Metadata query for dataProvider
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * [Determines when mutations are executed](/advanced-tutorials/mutation-mode.md)
     * @default `"pessimistic"*`
     */
    mutationMode?: MutationMode;
    /**
     * Called when a mutation is successful
     */
    onMutationSuccess?: (
        data: CreateResponse<TData> | UpdateResponse<TData>,
        variables: TVariables,
        context: any,
    ) => void;
    /**
     * Called when a mutation encounters an error
     */
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any,
    ) => void;
    /**
     * Duration to wait before executing mutations when `mutationMode = "undoable"`
     * @default `5000*`
     */
    undoableTimeout?: number;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
    /**
     * You can use it to manage the invalidations that will occur at the end of the mutation.
     * @type  `all`, `resourceAll`, `list`, `many`, `detail`, `false`
     * @default `["list", "many", "detail"]`
     */
    invalidates?: Array<keyof IQueryKeys>;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options of useOne hook used while in edit mode.
     */
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, HttpError>;
    /**
     * react-query's [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation) options of useCreate hook used while submitting in create and clone modes.
     */
    createMutationOptions?: UseCreateProps<
        TData,
        TError,
        TVariables
    >["mutationOptions"];
    /**
     * react-query's [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation) options of useUpdate hook used while submitting in edit mode.
     */
    updateMutationOptions?: UseUpdateProps<
        TData,
        TError,
        TVariables
    >["mutationOptions"];
} & SuccessErrorNotification<
    UpdateResponse<TData> | CreateResponse<TData>,
    TError,
    { id: BaseKey; values: TVariables } | TVariables
> &
    ActionParams &
    LiveModeProps;

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = ActionFormProps<TData, TError, TVariables> & ActionParams & LiveModeProps;

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    id?: BaseKey;
    setId: Dispatch<SetStateAction<BaseKey | undefined>>;

    queryResult?: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult:
        | UseUpdateReturnType<TData, TError, TVariables>
        | UseCreateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    onFinish: (
        values: TVariables,
    ) => Promise<CreateResponse<TData> | UpdateResponse<TData> | void>;
    redirect: (
        redirect: RedirectAction,
        idFromFunction?: BaseKey | undefined,
        routeParams?: Record<string, string | number>,
    ) => void;
};

/**
 * `useForm` is used to manage forms. It uses Ant Design {@link https://ant.design/components/form/ Form} data scope management under the hood and returns the required props for managing the form actions.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/form/useForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    resource: resourceFromProps,
    action: actionFromProps,
    id: idFromProps,
    onMutationSuccess,
    onMutationError,
    redirect: redirectFromProps,
    successNotification,
    errorNotification,
    meta,
    metaData,
    mutationMode: mutationModeProp,
    liveMode,
    onLiveEvent,
    liveParams,
    undoableTimeout,
    dataProviderName,
    invalidates,
    queryOptions,
    createMutationOptions,
    updateMutationOptions,
}: UseFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const { options } = useRefineContext();
    const { resources } = useResource();
    const routerType = useRouterType();
    const {
        resource: resourceFromRouter,
        id: idFromRouter,
        action: actionFromRouter,
    } = useParsed();
    const { useParams } = useRouterContext();
    const {
        resource: legacyResourceFromRoute,
        action: legacyActionFromRoute,
        id: legacyIdFromParams,
    } = useParams<ResourceRouterParams>();

    const newResourceNameFromRouter =
        typeof resourceFromRouter === "string"
            ? resourceFromRouter
            : resourceFromRouter?.name;

    /** We only accept `id` from URL params if `resource` is not explicitly passed. */
    /** This is done to avoid sending wrong requests for custom `resource` and an async `id` */
    const defaultId =
        !resourceFromProps ||
        resourceFromProps ===
            (routerType === "legacy"
                ? legacyResourceFromRoute
                : newResourceNameFromRouter)
            ? idFromProps ??
              (routerType === "legacy" ? legacyIdFromParams : idFromRouter)
            : idFromProps;

    // id state is needed to determine selected record in a context for example useModal
    const [id, setId] = React.useState<BaseKey | undefined>(defaultId);

    /**
     * In some cases, `id` from the router params is not available at the first render.
     *
     * (e.g. when using `Next.js` and client-side-rendering, `router` is not ready to use at the first render)
     *
     * We're watching for `defaultId` changes and setting `id` state if it's not equal to `defaultId`.
     */
    React.useEffect(() => {
        setId(defaultId);
    }, [defaultId]);

    /** `resourceName` fallback value depends on the router type */
    const resourceName =
        resourceFromProps ??
        (routerType === "legacy"
            ? legacyResourceFromRoute
            : newResourceNameFromRouter);
    /** `action` fallback value depends on the router type */
    /**
     * In earlier versions, we've trivially inferred the action type as `create` in `show` types.
     * This is probably done to cover cases with modals and drawers.
     *
     * This is not right, as we should not do trivial inference of the action type.
     * Users should explicitly pass the action type when needed.
     */
    const fallbackAction =
        routerType === "legacy" ? legacyActionFromRoute : actionFromRouter;
    const action =
        actionFromProps ??
        (fallbackAction === "edit" || fallbackAction === "clone"
            ? fallbackAction
            : "create");

    const resourceWithRoute = useResourceWithRoute();
    let resource: IResourceItem | undefined;

    if (routerType === "legacy") {
        if (resourceName) {
            resource = resourceWithRoute(resourceName);
        }
    } else {
        /** If `resource` is provided by the user, then try to pick the resource of create a dummy one */
        if (resourceFromProps) {
            const picked = pickResource(resourceFromProps, resources);
            if (picked) {
                resource = picked;
            } else {
                resource = {
                    name: resourceFromProps,
                    route: resourceFromProps,
                };
            }
        } else {
            /** If `resource` is not provided, check the resource from the router params */
            if (typeof resourceFromRouter === "string") {
                const picked = pickResource(resourceFromRouter, resources);
                if (picked) {
                    resource = picked;
                } else {
                    resource = {
                        name: resourceFromRouter,
                        route: resourceFromRouter,
                    };
                }
            } else {
                /** If `resource` is passed as an IResourceItem, use it or `resource` is undefined and cannot be inferred. */
                resource = resourceFromRouter;
            }
        }
    }

    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

    const isCreate = action === "create";
    const isEdit = action === "edit";
    const isClone = action === "clone";

    warnOnce(
        (isClone || isEdit) &&
            Boolean(resourceFromProps) &&
            !Boolean(idFromProps),
        `[useForm]: action: "${action}", resource: "${resourceName}", id: ${id} \n\n` +
            `If you don't use the \`setId\` method to set the \`id\`, you should pass the \`id\` prop to \`useForm\`. Otherwise, \`useForm\` will not be able to infer the \`id\` from the current URL. \n\n` +
            `See https://refine.dev/docs/api-reference/core/hooks/useForm/#resource`,
    );

    /**
     * Designated `redirect` route
     */
    const designatedRedirectAction = redirectPage({
        redirectFromProps,
        action,
        redirectOptions: options.redirect,
    });

    const enableQuery = id !== undefined && (isEdit || isClone);

    const queryResult = useOne<TData>({
        resource: resource?.name,
        id: id ?? "",
        queryOptions: {
            enabled: enableQuery,
            ...queryOptions,
        },
        liveMode,
        onLiveEvent,
        liveParams,
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        dataProviderName,
    });

    const { isFetching: isFetchingQuery } = queryResult;

    const mutationResultCreate = useCreate<TData, TError, TVariables>({
        mutationOptions: createMutationOptions,
    });
    const { mutate: mutateCreate, isLoading: isLoadingCreate } =
        mutationResultCreate;

    const mutationResultUpdate = useUpdate<TData, TError, TVariables>({
        mutationOptions: updateMutationOptions,
    });
    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
        mutationResultUpdate;

    const { setWarnWhen } = useWarnAboutChange();

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinishCreate = async (values: TVariables) => {
        setWarnWhen(false);

        const onSuccess = (id?: BaseKey) => {
            handleSubmitWithRedirect({
                redirect: designatedRedirectAction,
                resource,
                id,
                meta: metaData,
            });
        };

        if (mutationMode !== "pessimistic") {
            setTimeout(() => {
                onSuccess();
            });
        }

        return new Promise<CreateResponse<TData> | void>((resolve, reject) => {
            if (mutationMode !== "pessimistic") {
                resolve();
            }

            if (!resource) return;

            return mutateCreate(
                {
                    values,
                    resource: resource.name,
                    successNotification,
                    errorNotification,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                    dataProviderName,
                    invalidates,
                },
                {
                    onSuccess: (data, _, context) => {
                        if (onMutationSuccess) {
                            onMutationSuccess(data, values, context);
                        }

                        const responseId = data?.data?.id;

                        onSuccess(responseId);

                        resolve(data);
                    },
                    onError: (error: TError, _, context) => {
                        if (onMutationError) {
                            return onMutationError(error, values, context);
                        }
                        reject();
                    },
                },
            );
        });
    };

    const onFinishUpdate = async (values: TVariables) => {
        setWarnWhen(false);

        if (!resource) return;

        const variables: UpdateParams<TData, TError, TVariables> = {
            id: id ?? "",
            values,
            resource: resource.name,
            mutationMode,
            undoableTimeout,
            successNotification,
            errorNotification,
            meta: pickNotDeprecated(meta, metaData),
            metaData: pickNotDeprecated(meta, metaData),
            dataProviderName,
            invalidates,
        };

        const onSuccess = () => {
            handleSubmitWithRedirect({
                redirect: designatedRedirectAction,
                resource,
                id,
                meta: metaData,
            });
        };

        // setWarnWhen is set to "false" at the start of the mutation. With the help of setTimeout we guarantee that the value false is set.
        if (mutationMode !== "pessimistic") {
            setTimeout(() => {
                onSuccess();
            });
        }

        // setTimeout is required to make onSuccess e.g. callbacks to work if component unmounts i.e. on route change
        return new Promise<UpdateResponse<TData> | void>((resolve, reject) => {
            if (mutationMode !== "pessimistic") {
                resolve();
            }
            return setTimeout(() => {
                mutateUpdate(variables, {
                    onSuccess: (data, _, context) => {
                        if (onMutationSuccess) {
                            onMutationSuccess(data, values, context);
                        }

                        if (mutationMode === "pessimistic") {
                            onSuccess();
                        }

                        resolve(data);
                    },
                    onError: (error: TError, _, context) => {
                        if (onMutationError) {
                            return onMutationError(error, values, context);
                        }
                        reject();
                    },
                });
            });
        });
    };

    const createResult = {
        formLoading: isFetchingQuery || isLoadingCreate,
        mutationResult: mutationResultCreate,
        onFinish: onFinishCreate,
    };

    const editResult = {
        formLoading: isFetchingQuery || isLoadingUpdate,
        mutationResult: mutationResultUpdate,
        onFinish: onFinishUpdate,
    };

    const result = isCreate || isClone ? createResult : editResult;

    return {
        ...result,
        queryResult,
        id,
        setId,
        redirect: (redirect, idFromFunction?: BaseKey | undefined) => {
            handleSubmitWithRedirect({
                redirect:
                    redirect !== undefined
                        ? redirect
                        : isEdit
                        ? "list"
                        : "edit",
                resource,
                id: idFromFunction ?? id,
                meta: metaData,
            });
        },
    };
};

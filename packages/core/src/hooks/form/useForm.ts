import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";

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
    MetaDataQuery,
    UpdateResponse,
    MutationMode,
    BaseKey,
    IQueryKeys,
    FormAction,
} from "../../interfaces";
import { UpdateParams, UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateReturnType } from "../data/useCreate";
import { redirectPage } from "@definitions/helpers";

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
    metaData?: MetaDataQuery;
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
} & SuccessErrorNotification &
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
    metaData,
    mutationMode: mutationModeProp,
    liveMode,
    onLiveEvent,
    liveParams,
    undoableTimeout,
    dataProviderName,
    invalidates,
    queryOptions,
}: UseFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const { options } = useRefineContext();
    const { useParams } = useRouterContext();
    const {
        resource: resourceFromRoute,
        action: actionFromRoute,
        id: idFromParams,
    } = useParams<ResourceRouterParams>();

    const defaultId =
        !resourceFromProps || resourceFromProps === resourceFromRoute
            ? idFromProps ?? idFromParams
            : idFromProps;

    // id state is needed to determine selected record in a context for example useModal
    const [id, setId] = React.useState<BaseKey | undefined>(defaultId);

    React.useEffect(() => {
        if (defaultId !== id) {
            setId(idFromProps);
        }
    }, [idFromProps]);

    const resourceName = resourceFromProps ?? resourceFromRoute;
    const action =
        actionFromProps ??
        (actionFromRoute === "show" ? "create" : actionFromRoute) ??
        "create";

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceName);

    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

    const isCreate = action === "create";
    const isEdit = action === "edit";
    const isClone = action === "clone";

    const redirect = redirectPage({
        redirectFromProps,
        action,
        redirectOptions: options.redirect,
    });

    const enableQuery = id !== undefined && (isEdit || isClone);

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: id ?? "",
        queryOptions: {
            enabled: enableQuery,
            ...queryOptions,
        },
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
        dataProviderName,
    });

    const { isFetching: isFetchingQuery } = queryResult;

    const mutationResultCreate = useCreate<TData, TError, TVariables>();
    const { mutate: mutateCreate, isLoading: isLoadingCreate } =
        mutationResultCreate;

    const mutationResultUpdate = useUpdate<TData, TError, TVariables>();
    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
        mutationResultUpdate;

    const { setWarnWhen } = useWarnAboutChange();

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinishCreate = async (values: TVariables) => {
        setWarnWhen(false);

        const onSuccess = (id?: BaseKey) => {
            handleSubmitWithRedirect({
                redirect,
                resource,
                id,
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
            return mutateCreate(
                {
                    values,
                    resource: resource.name,
                    successNotification,
                    errorNotification,
                    metaData,
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

        const variables: UpdateParams<TVariables> = {
            id: id ?? "",
            values,
            resource: resource.name,
            mutationMode,
            undoableTimeout,
            successNotification,
            errorNotification,
            metaData,
            dataProviderName,
            invalidates,
        };

        const onSuccess = () => {
            // If it is in modal mode set it to undefined. Otherwise set it to current id from route.
            setId(defaultId);
            handleSubmitWithRedirect({
                redirect,
                resource,
                id,
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
            });
        },
    };
};

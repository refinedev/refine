import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "react-query";

import {
    useResourceWithRoute,
    useRouterContext,
    useWarnAboutChange,
    useCreate,
    useUpdate,
    useRedirectionAfterSubmission,
    useMutationMode,
    useOne,
} from "@hooks";

import {
    BaseRecord,
    CreateResponse,
    GetOneResponse,
    HttpError,
    LiveModeProps,
    ResourceRouterParams,
    RedirectionTypes,
    SuccessErrorNotification,
    MetaDataQuery,
    UpdateResponse,
    MutationMode,
} from "../../interfaces";
import { UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateReturnType } from "../data/useCreate";

export type ActionParams = {
    action?: "edit" | "create" | "clone";
};

type ActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    onMutationSuccess?: (
        data: CreateResponse<TData> | UpdateResponse<TData>,
        variables: TVariables,
        context: any,
    ) => void;
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any,
    ) => void;
    redirect?: RedirectionTypes;
    resource?: string;
    metaData?: MetaDataQuery;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    dataProviderName?: string;
} & SuccessErrorNotification &
    ActionParams &
    LiveModeProps;

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = ActionParams & ActionFormProps<TData, TError, TVariables> & LiveModeProps;

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    id?: string;
    setId: Dispatch<SetStateAction<string | undefined>>;

    queryResult?: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult:
        | UseUpdateReturnType<TData, TError, TVariables>
        | UseCreateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    onFinish: (values: TVariables) => Promise<void>;
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
    action: actionFromProps,
    resource: resourceFromProps,
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
}: UseFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const { useParams } = useRouterContext();
    const {
        resource: resourceFromRoute,
        action: actionFromRoute,
        id: idFromParams,
    } = useParams<ResourceRouterParams>();

    // id state is needed to determine selected record in a context for example useModal
    const [id, setId] = React.useState<string | undefined>(idFromParams);

    const resourceName = resourceFromProps ?? resourceFromRoute;
    const action = actionFromProps ?? actionFromRoute ?? "create";

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceName);

    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

    const isCreate = action === "create";
    const isEdit = action === "edit";
    const isClone = action === "clone";

    const redirect =
        redirectFromProps !== undefined
            ? redirectFromProps
            : isEdit
            ? "list"
            : "edit";

    const enableQuery = id !== undefined && (isEdit || isClone);

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: id ?? "",
        queryOptions: {
            enabled: enableQuery,
        },
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
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
        mutateCreate(
            {
                values,
                resource: resource.name,
                successNotification,
                errorNotification,
                metaData,
                dataProviderName,
            },
            {
                onSuccess: (data, variables, context) => {
                    if (onMutationSuccess) {
                        onMutationSuccess(data, values, context);
                    }

                    const id = data?.data?.id;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        id,
                    });
                },
                onError: (error: TError, variables, context) => {
                    if (onMutationError) {
                        return onMutationError(error, values, context);
                    }
                },
            },
        );
    };

    const onFinishUpdate = async (values: TVariables) => {
        setWarnWhen(false);

        // setTimeout is required to make onSuccess e.g. callbacks to work if component unmounts i.e. on route change
        setTimeout(() => {
            mutateUpdate(
                {
                    id: id ?? "",
                    values,
                    resource: resource.name,
                    mutationMode,
                    undoableTimeout,
                    successNotification,
                    errorNotification,
                    metaData,
                },
                {
                    onSuccess: (data, _, context) => {
                        if (onMutationSuccess) {
                            onMutationSuccess(data, values, context);
                        }

                        if (mutationMode === "pessimistic") {
                            // If it is in modal mode set it to undefined. Otherwise set it to current id from route.
                            setId(idFromParams);
                            handleSubmitWithRedirect({
                                redirect,
                                resource,
                                id,
                            });
                        }
                    },
                    onError: (error: TError, variables, context) => {
                        if (onMutationError) {
                            return onMutationError(error, values, context);
                        }
                    },
                },
            );
        });

        if (!(mutationMode === "pessimistic")) {
            // If it is in modal mode set it to undefined. Otherwise set it to current id from route.
            setId(idFromParams);
            handleSubmitWithRedirect({
                redirect,
                resource,
                id,
            });
        }
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

    return { ...result, queryResult, id, setId };
};

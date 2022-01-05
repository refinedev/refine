import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "react-query";

import {
    useMutationMode,
    useOne,
    useUpdate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
    useRouterContext,
} from "@hooks";
import { UseUpdateReturnType } from "../../data/useUpdate";

import {
    MutationMode,
    BaseRecord,
    ResourceRouterParams,
    RedirectionTypes,
    GetOneResponse,
    UpdateResponse,
    IResourceItem,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
    LiveModeProps,
} from "../../../interfaces";
import { ActionParams } from "../useForm";

export type useEditForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult: UseUpdateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
    onFinish: (values: TVariables) => Promise<void>;
};

export type useEditFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    onMutationSuccess?: (
        data: UpdateResponse<TData>,
        variables: TVariables,
        context: any,
    ) => void;
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any,
    ) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    undoableTimeout?: number;
    resource: IResourceItem;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification &
    ActionParams &
    LiveModeProps;

/**
 * A hook that the `useForm` uses
 * @internal
 */
export const useEditForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    onMutationSuccess,
    onMutationError,
    mutationMode: mutationModeProp,
    redirect = "list",
    undoableTimeout,
    resource,
    successNotification,
    errorNotification,
    liveMode,
    onLiveEvent,
    liveParams,
    metaData,
    action: actionFromParams,
}: useEditFormProps<TData, TError, TVariables>): useEditForm<
    TData,
    TError,
    TVariables
> => {
    const { useParams } = useRouterContext();

    const { id: idFromRoute, action: actionFromRoute } =
        useParams<ResourceRouterParams>();
    const [editId, setEditId] = React.useState<string | undefined>(idFromRoute);

    const action = actionFromParams ?? actionFromRoute;

    const { setWarnWhen } = useWarnAboutChange();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const isEdit = editId !== undefined && action === "edit";

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: editId ?? "",
        queryOptions: {
            enabled: isEdit,
        },
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
    });

    const { /* data,  */ isFetching } = queryResult;

    const mutationResult = useUpdate<TData, TError, TVariables>();

    const { mutate, isLoading: isLoadingMutation } = mutationResult;

    const formLoading = isFetching || isLoadingMutation;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: TVariables) => {
        setWarnWhen(false);

        console.log("onFinish");

        // Required to make onSuccess vs callbacks to work if component unmounts i.e. on route change
        setTimeout(() => {
            console.log("mutate");
            mutate(
                {
                    id: editId ?? "",
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
                        console.log("onsuccess");
                        if (onMutationSuccess) {
                            return onMutationSuccess(data, values, context);
                        }

                        if (mutationMode === "pessimistic") {
                            setEditId(undefined);
                            handleSubmitWithRedirect({
                                redirect,
                                resource,
                                id: editId,
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
            setEditId(undefined);
            handleSubmitWithRedirect({
                redirect,
                resource,
                id: editId,
            });
        }
    };

    return {
        editId,
        setEditId,
        queryResult,
        mutationResult,
        formLoading,
        onFinish,
    };
};

import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form, FormInstance, FormProps } from "antd";
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

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useEditForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    form: FormInstance<TVariables>;
    formProps: FormProps<TVariables>;
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult: UseUpdateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
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
    submitOnEnter = false,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
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

    const [formAnt] = Form.useForm();
    const formSF = useFormSF<TData, TVariables>({
        form: formAnt,
    });

    const { form } = formSF;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

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

    const { data, isFetching } = queryResult;

    React.useEffect(() => {
        form.setFieldsValue({
            ...(data?.data as any), // Fix Me
        });
        return () => {
            form.resetFields();
        };
    }, [data, editId, isFetching]);

    const mutationResult = useUpdate<TData, TError, TVariables>();

    const { mutate, isLoading: isLoadingMutation } = mutationResult;

    const formLoading = isFetching || isLoadingMutation;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: TVariables) => {
        setWarnWhen(false);

        // Required to make onSuccess vs callbacks to work if component unmounts i.e. on route change
        setTimeout(() => {
            mutate(
                {
                    id: editId ?? "",
                    values,
                    resource: resource.name,
                    mutationMode,
                    undoableTimeout,
                    successNotification,
                    errorNotification,
                },
                {
                    onSuccess: (data, _, context) => {
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

    const onKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (submitOnEnter && event.key === "Enter") {
            form.submit();
        }
    };

    const onValuesChange = (changeValues: object) => {
        if (changeValues && warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    const saveButtonProps: SaveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form.submit();
        },
        loading: formLoading,
    };

    return {
        ...formSF,
        formProps: {
            ...formSF.formProps,
            onFinish,
            onKeyUp,
            onValuesChange,
        },
        editId,
        setEditId,
        saveButtonProps,
        queryResult,
        mutationResult,
        formLoading,
    };
};

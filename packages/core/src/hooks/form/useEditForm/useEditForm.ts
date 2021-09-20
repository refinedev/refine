import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form, FormInstance, FormProps } from "antd";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import {
    useMutationMode,
    useOne,
    useUpdate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
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
} from "../../../interfaces";

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
} & SuccessErrorNotification;

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
    metaData,
}: useEditFormProps<TData, TError, TVariables>): useEditForm<
    TData,
    TError,
    TVariables
> => {
    const [editId, setEditId] = React.useState<string>();

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

    const { id: idFromRoute, action } = useParams<ResourceRouterParams>();
    const isEdit = !!editId || action === "edit";

    const id = editId ?? idFromRoute;

    const queryResult = useOne<TData>({
        resource: resource.name,
        id,
        queryOptions: {
            enabled: isEdit,
        },
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
    }, [data, id, isFetching]);

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
                    id,
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
                                id: idFromRoute,
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
                id: idFromRoute,
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

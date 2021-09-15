import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form, FormProps, FormInstance } from "antd";

import {
    useCreate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
} from "@hooks";
import { UseCreateReturnType } from "../../data/useCreate";

import {
    BaseRecord,
    RedirectionTypes,
    CreateResponse,
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

export type useCreateForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    form: FormInstance<TVariables>;
    formProps: FormProps<TVariables>;
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<TData, TError, TVariables>;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
};

export type useCreateFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    onMutationSuccess?: (
        data: CreateResponse<TData>,
        variables: TVariables,
        context: any,
    ) => void;
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any,
    ) => void;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    resource: IResourceItem;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

/**
 * A hook that the `useForm` uses
 * @internal
 */
export const useCreateForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    onMutationSuccess,
    onMutationError,
    submitOnEnter = false,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
    resource,
    successNotification,
    errorNotification,
    metaData,
}: useCreateFormProps<TData, TError, TVariables>): useCreateForm<
    TData,
    TError,
    TVariables
> => {
    const [formAnt] = Form.useForm();
    const formSF = useFormSF<TData, TVariables>({
        form: formAnt,
    });

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const { form } = formSF;

    const mutationResult = useCreate<TData, TError, TVariables>();
    const { mutate, isLoading } = mutationResult;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: TVariables) => {
        setWarnWhen(false);
        mutate(
            {
                values,
                resource: resource.name,
                successNotification,
                errorNotification,
                metaData,
            },
            {
                onSuccess: (data, variables, context) => {
                    if (onMutationSuccess) {
                        return onMutationSuccess(data, values, context);
                    }

                    form.resetFields();

                    const id = data.data.id;

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

    React.useEffect(() => {
        return () => {
            form.resetFields();
        };
    }, []);

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

    const saveButtonProps = {
        disabled: isLoading,
        onClick: () => {
            form.submit();
        },
    };

    return {
        ...formSF,
        formProps: {
            ...formSF.formProps,
            onFinish,
            onKeyUp,
            onValuesChange,
        },
        saveButtonProps,
        formLoading: isLoading,
        mutationResult,
    };
};

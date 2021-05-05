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
    MutationMode,
    FormSF,
    BaseRecord,
    RedirectionTypes,
    CreateResponse,
    UseFormSFFormProps,
    IResourceItem,
} from "../../../interfaces";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useCreateForm<T, M> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<M>;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export type useCreateFormProps<M> = {
    onMutationSuccess?: (
        data: CreateResponse<M>,
        variables: any,
        context: any,
    ) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    resource: IResourceItem;
};

export const useCreateForm = <
    RecordType extends BaseRecord = BaseRecord,
    MutationType extends BaseRecord = RecordType
>({
    onMutationSuccess,
    onMutationError,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
    resource,
}: useCreateFormProps<MutationType>): useCreateForm<
    RecordType,
    MutationType
> => {
    const [formAnt] = Form.useForm();
    const formSF: FormSF = useFormSF({
        form: formAnt,
    });

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const { form } = formSF;

    const mutationResult = useCreate<MutationType>();
    const { mutate, isLoading } = mutationResult;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: BaseRecord) => {
        setWarnWhen(false);
        mutate(
            { values, resource: resource.name },
            {
                onSuccess: (data, ...rest) => {
                    if (onMutationSuccess) {
                        return onMutationSuccess(data, ...rest);
                    }

                    const id = data.data.id;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        id,
                    });
                },
                onError: (error: any, ...rest) => {
                    if (onMutationError) {
                        return onMutationError(error, ...rest);
                    }
                },
            },
        );
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

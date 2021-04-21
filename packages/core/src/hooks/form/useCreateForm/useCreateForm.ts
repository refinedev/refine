import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form, FormProps, FormInstance } from "antd";
import { useParams } from "react-router-dom";

import {
    useResourceWithRoute,
    useCreate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
} from "@hooks";
import { UseCreateReturnType } from "../../data/useCreate";

import {
    MutationMode,
    FormSF,
    BaseRecord,
    ResourceRouterParams,
    RedirectionTypes,
    CreateResponse,
    UseFormSFFormProps,
} from "../../../interfaces";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useCreateForm<T> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<T>;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export type useCreateFormProps<T> = {
    onMutationSuccess?: (
        data: CreateResponse<T>,
        variables: any,
        context: any,
    ) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
};

export const useCreateForm = <RecordType extends BaseRecord = BaseRecord>({
    onMutationSuccess,
    onMutationError,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
}: useCreateFormProps<RecordType>): useCreateForm<RecordType> => {
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

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const mutationResult = useCreate<RecordType>();
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

                    const idFromRoute = data.data.id!;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        idFromRoute,
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

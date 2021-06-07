import React, { Dispatch, SetStateAction, HTMLAttributes } from "react";
import {
    useForm as useFormRHF,
    UseFormReturn as UseFormReturnRHF,
    UseFormProps as UseFormPropsRHF,
    FieldValues,
} from "react-hook-form";

import {
    useCreate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
    useResourceWithRoute,
} from "@hooks";
import { UseCreateReturnType } from "../../data/useCreate";

import {
    BaseRecord,
    RedirectionTypes,
    CreateResponse,
    HttpError,
    ResourceRouterParams,
} from "../../../interfaces";
import { useParams } from "react-router-dom";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useReactHookForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
> = UseFormReturnRHF<TVariables> & {
    formProps: HTMLAttributes<HTMLFormElement>;
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<TData, TError, TVariables>;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
};

export type useReactHookFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
> = {
    useFormProps?: UseFormPropsRHF<TVariables>;
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
    resource?: string;
};

export const useReactHookForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
>({
    useFormProps,
    onMutationSuccess,
    onMutationError,
    submitOnEnter = false,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
    resource: resourceFromProps,
}: useReactHookFormProps<TData, TError, TVariables> = {}): useReactHookForm<
    TData,
    TError,
    TVariables
> => {
    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const mutationResult = useCreate<TData, TError, TVariables>();

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const resourceWithRoute = useResourceWithRoute();
    const { resource: resourceFromParams } = useParams<ResourceRouterParams>();

    const resourceType = resourceFromProps ?? resourceFromParams;

    const resource = resourceWithRoute(resourceType);

    const reactHookForm = useFormRHF<TVariables>(useFormProps);

    const { handleSubmit, watch } = reactHookForm;

    const watchAllFields = watch();

    React.useEffect(() => {
        console.log({ watchAllFields });
        if (warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
    }, [watchAllFields]);

    const { mutate, isLoading } = mutationResult;

    const onFinish = async (values: any) => {
        setWarnWhen(false);
        mutate(
            { values, resource: resource.name },
            {
                onSuccess: (data, _variables, context) => {
                    if (onMutationSuccess) {
                        return onMutationSuccess(data, values, context);
                    }

                    const id = data.data.id;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        id,
                    });
                },
                onError: (error: TError, _variables, context) => {
                    if (onMutationError) {
                        return onMutationError(error, values, context);
                    }
                },
            },
        );
    };

    const onSubmit = handleSubmit(onFinish);

    const onFormSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        if (!submitOnEnter) {
            return;
        }
        onSubmit();
    };

    const saveButtonProps = {
        disabled: isLoading,
        onClick: onSubmit,
    };

    return {
        ...reactHookForm,

        formProps: {
            onSubmit: onFormSubmit,
        },
        saveButtonProps,
        formLoading: isLoading,
        mutationResult,
    };
};

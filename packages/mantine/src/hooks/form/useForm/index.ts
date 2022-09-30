import React, { useEffect } from "react";
import {
    useForm as useMantineForm,
    UseFormReturnType as UseMantineFormReturnType,
} from "@mantine/form";
import { UseFormInput, OnSubmit } from "@mantine/form/lib/types";
import {
    BaseRecord,
    HttpError,
    useForm as useFormCore,
    useWarnAboutChange,
    UseFormProps as UseFormCoreProps,
    UseFormReturnType as UseFormReturnTypeCore,
} from "@pankod/refine-core";

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
> = UseMantineFormReturnType<TVariables> & {
    refineCore: UseFormReturnTypeCore<TData, TError, TVariables>;
    saveButtonProps: {
        disabled: boolean;
        onClick: (e: React.FormEvent<HTMLFormElement>) => void;
    };
};

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
> = {
    refineCoreProps?: UseFormCoreProps<TData, TError, TVariables> & {
        warnWhenUnsavedChanges?: boolean;
    };
} & UseFormInput<TVariables>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
>({
    refineCoreProps,
    ...rest
}: UseFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const warnWhenUnsavedChangesProp = refineCoreProps?.warnWhenUnsavedChanges;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine,
        setWarnWhen,
    } = useWarnAboutChange();
    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

    const useFormCoreResult = useFormCore<TData, TError, TVariables>({
        ...refineCoreProps,
    });

    const { queryResult, onFinish, formLoading } = useFormCoreResult;

    const useMantineFormResult = useMantineForm<TVariables>({
        ...rest,
    });

    const {
        setValues,
        onSubmit: onMantineSubmit,
        isDirty,
    } = useMantineFormResult;

    useEffect(() => {
        if (typeof queryResult?.data !== "undefined") {
            const fields: any = {};
            const registeredFields = Object.keys(rest.initialValues ?? {});
            Object.entries(queryResult?.data?.data || {}).forEach(
                ([key, value]) => {
                    if (registeredFields.includes(key)) {
                        fields[key] = value;
                    }
                },
            );

            setValues(fields);
        }
    }, [queryResult?.data]);

    const isValuesChanged = isDirty();

    useEffect(() => {
        if (warnWhenUnsavedChanges && isValuesChanged) {
            setWarnWhen(true);
        }
    }, [isValuesChanged]);

    const onSubmit: OnSubmit<TVariables> =
        (handleSubmit, handleValidationFailure) => async (e) => {
            setWarnWhen(false);
            return await onMantineSubmit(
                handleSubmit,
                handleValidationFailure,
            )(e);
        };

    const saveButtonProps = {
        disabled: formLoading,
        onClick: (e: React.FormEvent<HTMLFormElement>) => {
            onSubmit(onFinish, () => false)(e);
        },
    };

    return {
        ...useMantineFormResult,
        onSubmit,
        refineCore: useFormCoreResult,
        saveButtonProps,
    };
};

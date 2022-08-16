import React, { useEffect } from "react";
import {
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
    UseFormReturn,
    FieldValues,
    UseFormHandleSubmit,
    SubmitHandler,
    SubmitErrorHandler,
} from "react-hook-form";
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
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = UseFormReturn<TVariables, TContext> & {
    refineCore: UseFormReturnTypeCore<TData, TError, TVariables>;
    saveButtonProps: {
        disabled: boolean;
        onClick: (e: React.BaseSyntheticEvent) => void;
    };
};

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = {
    refineCoreProps?: UseFormCoreProps<TData, TError, TVariables>;
    warnWhenUnsavedChanges?: boolean;
} & UseHookFormProps<TVariables, TContext>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
>({
    refineCoreProps,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    ...rest
}: UseFormProps<TData, TError, TVariables, TContext> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables,
    TContext
> => {
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

    const useHookFormResult = useHookForm<TVariables, TContext>({
        ...rest,
    });

    const {
        watch,
        reset,
        getValues,
        handleSubmit: handleSubmitReactHookForm,
    } = useHookFormResult;

    useEffect(() => {
        if (typeof queryResult?.data !== "undefined") {
            const fields: any = {};
            const registeredFields = Object.keys(getValues());
            Object.entries(queryResult?.data?.data || {}).forEach(
                ([key, value]) => {
                    if (registeredFields.includes(key)) {
                        fields[key] = value;
                    }
                },
            );

            reset(fields as any);
        }
    }, [queryResult?.data]);

    useEffect(() => {
        const subscription = watch((values: any, { type }: { type?: any }) => {
            if (type === "change") {
                onValuesChange(values);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onValuesChange = (changeValues: Record<string, any>) => {
        if (warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    const handleSubmit: UseFormHandleSubmit<TVariables> =
        (onValid, onInvalid) => async (e) => {
            setWarnWhen(false);
            return await handleSubmitReactHookForm(onValid, onInvalid)(e);
        };

    const saveButtonProps = {
        disabled: formLoading,
        onClick: (e: React.BaseSyntheticEvent) => {
            handleSubmit(onFinish, () => false)(e);
        },
    };

    return {
        ...useHookFormResult,
        handleSubmit,
        refineCore: useFormCoreResult,
        saveButtonProps,
    };
};

import React, { useEffect } from "react";
import {
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
    UseFormReturn,
    FieldValues,
    UseFormHandleSubmit,
    Path,
} from "react-hook-form";
import {
    BaseRecord,
    HttpError,
    useForm as useFormCore,
    useWarnAboutChange,
    UseFormProps as UseFormCoreProps,
    UseFormReturnType as UseFormReturnTypeCore,
} from "@refinedev/core";

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TSelectData extends BaseRecord = TData,
> = UseFormReturn<TVariables, TContext> & {
    refineCore: UseFormReturnTypeCore<TData, TError, TVariables, TSelectData>;
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
    TSelectData extends BaseRecord = TData,
> = {
    /**
     * Configuration object for the core of the [useForm](/docs/api-reference/core/hooks/useForm/)
     * @type [`UseFormCoreProps<TData, TError, TVariables>`](/docs/api-reference/core/hooks/useForm/#properties)
     */
    refineCoreProps?: UseFormCoreProps<TData, TError, TVariables, TSelectData>;
    /**
     * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
     * @default `false*`
     */
    warnWhenUnsavedChanges?: boolean;
} & UseHookFormProps<TVariables, TContext>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TSelectData extends BaseRecord = TData,
>({
    refineCoreProps,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    ...rest
}: UseFormProps<
    TData,
    TError,
    TVariables,
    TContext,
    TSelectData
> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables,
    TContext,
    TSelectData
> => {
    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine,
        setWarnWhen,
    } = useWarnAboutChange();
    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

    const useFormCoreResult = useFormCore<
        TData,
        TError,
        TVariables,
        TSelectData
    >({
        ...refineCoreProps,
    });

    const { queryResult, onFinish, formLoading } = useFormCoreResult;

    const useHookFormResult = useHookForm<TVariables, TContext>({
        ...rest,
    });

    const {
        watch,
        setValue,
        getValues,
        handleSubmit: handleSubmitReactHookForm,
    } = useHookFormResult;

    useEffect(() => {
        const data = queryResult?.data?.data;
        if (!data) return;

        const registeredFields = Object.keys(getValues());
        Object.entries(data).forEach(([key, value]) => {
            const name = key as Path<TVariables>;

            if (registeredFields.includes(name)) {
                setValue(name, value);
            }
        });
    }, [queryResult?.data, setValue, getValues]);

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

import React, { useEffect } from "react";
import {
    useForm as useMantineForm,
    UseFormReturnType as UseMantineFormReturnType,
} from "@mantine/form";
import { UseFormInput } from "@mantine/form/lib/types";
import {
    BaseRecord,
    HttpError,
    useForm as useFormCore,
    useWarnAboutChange,
    UseFormProps as UseFormCoreProps,
    UseFormReturnType as UseFormReturnTypeCore,
} from "@pankod/refine-core";

type FormVariableType<TVariables, TTransformed> = ReturnType<
    NonNullable<
        UseFormInput<
            TVariables,
            (values: TVariables) => TTransformed
        >["transformValues"]
    >
>;

export type UseFormReturnType<
    TData extends BaseRecord,
    TError extends HttpError,
    TVariables,
    TTransformed = TVariables,
> = UseMantineFormReturnType<
    TVariables,
    (values: TVariables) => TTransformed
> & {
    refineCore: UseFormReturnTypeCore<
        TData,
        TError,
        FormVariableType<TVariables, TTransformed>
    >;
    saveButtonProps: {
        disabled: boolean;
        onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
    };
};

export type UseFormProps<
    TData extends BaseRecord,
    TError extends HttpError,
    TVariables,
    TTransformed = TVariables,
> = {
    refineCoreProps?: UseFormCoreProps<
        TData,
        TError,
        FormVariableType<TVariables, TTransformed>
    > & {
        warnWhenUnsavedChanges?: boolean;
    };
} & UseFormInput<TVariables, (values: TVariables) => TTransformed>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
>({
    refineCoreProps,
    ...rest
}: UseFormProps<
    TData,
    TError,
    TVariables,
    TTransformed
> = {}): UseFormReturnType<TData, TError, TVariables, TTransformed> => {
    const warnWhenUnsavedChangesProp = refineCoreProps?.warnWhenUnsavedChanges;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine,
        setWarnWhen,
    } = useWarnAboutChange();
    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

    const useFormCoreResult = useFormCore<
        TData,
        TError,
        FormVariableType<TVariables, TTransformed>
    >({
        ...refineCoreProps,
    });

    const { queryResult, onFinish, formLoading } = useFormCoreResult;

    const useMantineFormResult = useMantineForm<
        TVariables,
        (values: TVariables) => TTransformed
    >({
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

    const onSubmit: typeof useMantineFormResult["onSubmit"] =
        (handleSubmit, handleValidationFailure) => async (e) => {
            setWarnWhen(false);
            return await onMantineSubmit(
                handleSubmit,
                handleValidationFailure,
            )(e);
        };

    const saveButtonProps = {
        disabled: formLoading,
        onClick: (e: React.PointerEvent<HTMLButtonElement>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error event type is not compatible with pointer event
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

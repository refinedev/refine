import { useEffect } from "react";
import {
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
    UseFormReturn,
    FieldValues,
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
};

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = {
    refineCoreProps?: UseFormCoreProps<TData, TError, TVariables>;
} & UseHookFormProps<TVariables, TContext>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
>({
    refineCoreProps,
    ...rest
}: UseFormProps<TData, TError, TVariables, TContext> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables,
    TContext
> => {
    const { warnWhenUnsavedChanges, setWarnWhen } = useWarnAboutChange();

    const useFormCoreResult = useFormCore<TData, TError, TVariables>({
        onMutationSuccess: () => {
            reset();
        },
        ...refineCoreProps,
    });

    const { queryResult } = useFormCoreResult;

    const useHookFormResult = useHookForm<TVariables, TContext>({
        ...rest,
    });

    const { watch, reset, getValues } = useHookFormResult;

    useEffect(() => {
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

    return {
        ...useHookFormResult,
        refineCore: useFormCoreResult,
    };
};

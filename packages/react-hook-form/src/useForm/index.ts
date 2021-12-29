import { useEffect } from "react";
import {
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
} from "react-hook-form";
import {
    BaseRecord,
    HttpError,
    useForm as useFormCore,
    useWarnAboutChange,
    useFormProps,
    UseFormReturnType as UseFormReturnTypeCore,
} from "@pankod/refine-core";

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = ReturnType<typeof useHookForm> & {
    useFormCore: UseFormReturnTypeCore<TData, TError, TVariables>;
};

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    useFormCoreProps?: useFormProps<TData, TError, TVariables>;
} & UseHookFormProps;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    useFormCoreProps,
    ...rest
}: UseFormProps<TData, TError, TVariables>): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const { warnWhenUnsavedChanges, setWarnWhen } = useWarnAboutChange();

    const useHookFormResult = useHookForm({
        ...rest,
    });

    const { watch, setValue, reset } = useHookFormResult;

    const useFormCoreResult = useFormCore({
        onMutationSuccess: () => {
            reset();
        },
        ...useFormCoreProps,
    });

    const { editId, queryResult } = useFormCoreResult;
    const { data, isFetching } = queryResult ?? {};

    useEffect(() => {
        const subscription = watch((values: any, { type }: { type?: any }) => {
            if (type === "change") {
                onValuesChange(values);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        Object.entries(queryResult?.data?.data || {}).forEach(
            ([key, value]) => {
                setValue(key, value);
            },
        );
        return () => {
            reset();
        };
    }, [data, editId, isFetching]);

    const onValuesChange = (changeValues: Record<string, any>) => {
        if (warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    return {
        ...useHookFormResult,
        useFormCore: useFormCoreResult,
    };
};

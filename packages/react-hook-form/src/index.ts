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
} from "@pankod/refine-core";

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    useFormCoreProps: useFormProps<TData, TError, TVariables>;
} & UseHookFormProps;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    useFormCoreProps,
    ...rest
}: UseFormProps<TData, TError, TVariables>): any => {
    const { warnWhenUnsavedChanges, setWarnWhen } = useWarnAboutChange();

    const useHookFormResult = useHookForm({
        ...rest,
        // defaultValues: {
        //     title: "",
        //     "category.id": undefined,
        //     status: "draft",
        //     content: "",
        // },
    });

    const { handleSubmit, reset, watch } = useHookFormResult;

    const useFormCoreResult = useFormCore({
        onMutationSuccess: () => {
            reset();
        },
        ...useFormCoreProps,
    });

    // const { onFinish } = useFormCoreResult;

    useEffect(() => {
        const subscription = watch((values, { type }) => {
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

    // const onSubmit = handleSubmit(onFinish);

    return {
        ...useHookFormResult,
        useFormCore: useFormCoreResult,
        // onSubmit,
    };
};

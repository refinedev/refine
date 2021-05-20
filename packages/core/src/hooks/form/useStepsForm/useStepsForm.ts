import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import {
    BaseRecord,
    HttpError,
    useStepsFormFromSFReturnType,
} from "../../../interfaces";

import { useForm, useFormProps } from "../useForm";

export type useStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = useForm<TData, TError, TVariables> &
    useStepsFormFromSFReturnType<TData, TVariables>;

export type useStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = useFormProps<TData, TError, TVariables> & UseStepsFormConfig;

export const useStepsForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>(
    props: useStepsFormProps<TData, TError, TVariables> = {},
): useStepsFormReturnType<TData, TError, TVariables> => {
    const useFormProps = useForm<TData, TError, TVariables>({ ...props });
    const { form, formProps } = useFormProps;

    const stepsPropsSunflower = useStepsFormSF<TData, TVariables>({
        ...props,
        form: form,
        submit: (values: any) => {
            formProps && formProps.onFinish && formProps.onFinish(values);
        },
    });

    return {
        ...useFormProps,
        ...stepsPropsSunflower,
        formProps: {
            ...stepsPropsSunflower.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
        },
        saveButtonProps: {
            ...useFormProps.saveButtonProps,
            onClick: () => stepsPropsSunflower.submit(),
        },
    };
};

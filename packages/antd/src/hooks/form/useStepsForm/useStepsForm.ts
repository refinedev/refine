import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";
import { FormInstance, FormProps } from "antd";

import {
    HttpError,
    UseFormProps as UseFormPropsCore,
    BaseRecord,
} from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormFromSFReturnType<TData, TVariables> = {
    current: number;
    gotoStep: (step: number) => void;
    stepsProps: {
        current: number;
        onChange: (currentStep: number) => void;
    };
    formProps: FormProps<TVariables>;
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    form: FormInstance<TVariables>;
    submit: (values?: TVariables) => Promise<TData>;
};

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSelectData extends BaseRecord = TData,
> = UseFormReturnType<TData, TError, TVariables, TSelectData> &
    UseStepsFormFromSFReturnType<TSelectData, TVariables>;

export type UseStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSelectData extends BaseRecord = TData,
> = UseFormPropsCore<TData, TError, TVariables, TSelectData> &
    UseFormProps<TData, TError, TVariables, TSelectData> &
    UseStepsFormConfig;

/**
 * `useStepsForm` hook allows you to split your form under an Ant Design based {@link https://ant.design/components/steps/ Steps} component and provides you with a few useful functionalities that will help you manage your form.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/form/useStepsForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useStepsForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSelectData extends BaseRecord = TData,
>(
    props: UseStepsFormProps<TData, TError, TVariables, TSelectData> = {},
): UseStepsFormReturnType<TData, TError, TVariables, TSelectData> => {
    const useFormProps = useForm<TData, TError, TVariables, TSelectData>({
        ...props,
    });
    const { form, formProps } = useFormProps;

    const stepsPropsSunflower = useStepsFormSF<TSelectData, TVariables>({
        isBackValidate: false,
        form: form,
        submit: (values: any) => {
            formProps?.onFinish?.(values);
        },
        ...props,
    });

    return {
        ...useFormProps,
        ...stepsPropsSunflower,
        formProps: {
            ...stepsPropsSunflower.formProps,
            ...useFormProps.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
        },
        saveButtonProps: {
            ...useFormProps.saveButtonProps,
            onClick: () => stepsPropsSunflower.submit(),
        },
    };
};

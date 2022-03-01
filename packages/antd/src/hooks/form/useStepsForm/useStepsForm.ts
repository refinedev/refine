import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import {
    HttpError,
    UseFormProps as UseFormPropsCore,
    BaseRecord,
} from "@pankod/refine-core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { useStepsFormFromSFReturnType } from "../../../types/sunflower";

export type useStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormReturnType<TData, TError, TVariables> &
    useStepsFormFromSFReturnType<TData, TVariables>;

export type useStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormPropsCore<TData, TError, TVariables> &
    UseFormProps &
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

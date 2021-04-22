import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { BaseRecord, StepsFormSF } from "../../../interfaces";
import { useForm, useFormProps } from "../useForm";

export type useStepsFormProps<T> = Partial<useFormProps<T>> &
    UseStepsFormConfig;

export type useStepsForm<T> = useForm<T> & StepsFormSF & {};

export const useStepsForm = <RecordType = BaseRecord>(
    props: useStepsFormProps<RecordType>,
): useStepsForm<RecordType> => {
    const useFormProps = useForm<RecordType>({ ...props });
    const { form, formProps, formLoading } = useFormProps;

    const stepsPropsSunflower: StepsFormSF = useStepsFormSF({
        ...props,
        form: form,
        submit: (values) => {
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
        formLoading,
    };
};

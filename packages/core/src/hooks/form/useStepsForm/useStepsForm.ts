import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { BaseRecord, StepsFormSF } from "../../../interfaces";
import { useForm } from "../useForm";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps<T> = Partial<
    useEditFormProps<T> & useCreateFormProps<T>
> &
    UseStepsFormConfig;

export const useStepsForm = <RecordType = BaseRecord>(
    props: useStepsFormProps<RecordType>,
) => {
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

import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { useForm } from "@hooks";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps = (
    props: (useCreateFormProps | useEditFormProps) & UseStepsFormConfig,
) => ReturnType<typeof useStepsFormSF>;

export const useStepsForm: useStepsFormProps = (props) => {
    const form = useForm({ ...props });

    const stepsPropsSunflower = useStepsFormSF({
        ...props,
        form: form.form,
        submit: (values) => {
            form.formProps?.onFinish(values as any);
        },
    });

    return {
        ...stepsPropsSunflower,
        formProps: {
            ...stepsPropsSunflower.formProps,
            onValuesChange: form.formProps?.onValuesChange,
            onKeyUp: form.formProps?.onKeyUp,
        },
    };
};

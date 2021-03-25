import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { useForm } from "@hooks";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps = (useCreateFormProps | useEditFormProps) &
    UseStepsFormConfig;

export const useStepsForm = (props: useStepsFormProps) => {
    const { form, formProps, isFetching } = useForm({ ...props });

    const stepsPropsSunflower = useStepsFormSF({
        ...props,
        form: form,
        submit: (values) => {
            formProps?.onFinish(values as any);
        },
    });

    return {
        ...stepsPropsSunflower,
        formProps: {
            ...stepsPropsSunflower.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
        },
        isFetching,
    };
};

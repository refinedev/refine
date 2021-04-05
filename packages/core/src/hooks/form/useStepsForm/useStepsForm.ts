import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { useForm } from "@hooks";
import { StepsFormSF } from "../../../interfaces";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps = Partial<useEditFormProps & useCreateFormProps> &
    UseStepsFormConfig;

export const useStepsForm = (props: useStepsFormProps) => {
    const useFormProps = useForm({ ...props });
    const { form, formProps, formLoading } = useFormProps;

    const stepsPropsSunflower: StepsFormSF = useStepsFormSF({
        ...props,
        form: form,
        submit: (values) => {
            formProps?.onFinish(values as any);
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

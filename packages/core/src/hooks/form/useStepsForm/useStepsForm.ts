import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { useForm } from "@hooks";
import { StepsFormSF } from "../../../interfaces";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps = (useCreateFormProps | useEditFormProps) &
    UseStepsFormConfig;

export const useStepsForm = (props: useStepsFormProps) => {
    const { form, formProps, formLoading } = useForm({ ...props });

    const stepsPropsSunflower: StepsFormSF = useStepsFormSF({
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
        formLoading,
    };
};

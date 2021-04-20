import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { useForm } from "@hooks";
import { StepsFormSF } from "../../../interfaces";

import { useEditFormProps, useCreateFormProps } from "..";

export type useStepsFormProps<T> = Partial<
    useEditFormProps & useCreateFormProps<T>
> &
    UseStepsFormConfig;

export const useStepsForm = <RecordType>(
    props: useStepsFormProps<RecordType>,
) => {
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

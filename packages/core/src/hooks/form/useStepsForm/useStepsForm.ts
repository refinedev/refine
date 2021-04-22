import {
    useStepsForm as useStepsFormSF,
    UseStepsFormConfig,
} from "sunflower-antd";

import { BaseRecord, StepsFormSF } from "../../../interfaces";
import { useForm, useFormProps } from "../useForm";

export type useStepsFormProps<T> = Partial<useFormProps<T>> &
    UseStepsFormConfig;

export type useStepsForm<T, M> = useForm<T, M> & StepsFormSF & {};

export const useStepsForm = <
    RecordType = BaseRecord,
    MutationType extends BaseRecord = RecordType
>(
    props: useStepsFormProps<MutationType>,
): useStepsForm<RecordType, MutationType> => {
    const useFormProps = useForm<RecordType, MutationType>({ ...props });
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

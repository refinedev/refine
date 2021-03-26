import { useForm, useStepsForm } from "sunflower-antd";
import { FormInstance } from "antd";

export type UseFormSF = typeof useForm;

export type UseFormReturn = ReturnType<UseFormSF>;

export type FormProps = Pick<UseFormReturn, "formProps">;

export type FormSF = Omit<UseFormReturn, "form"> & {
    form: FormInstance;
};

export type StepsFormSF = Omit<ReturnType<typeof useStepsForm>, "form"> & {
    form: FormInstance;
};

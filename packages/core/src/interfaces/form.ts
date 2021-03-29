import { useForm, useStepsForm, useModalForm } from "sunflower-antd";
import { FormInstance } from "antd";

export type UseFormSF = typeof useForm;
export type UseStepsFormSF = typeof useStepsForm;
export type UseModalFormSF = typeof useModalForm;

export type UseFormSFReturn = ReturnType<UseFormSF>;
export type UseStepsFormSFReturn = ReturnType<UseStepsFormSF>;
export type UseModalFormSFReturn = ReturnType<UseModalFormSF>;

export type UseFormSFFormProps = Pick<UseFormSFReturn, "formProps">;

export type FormSF = Omit<UseFormSFReturn, "form"> & {
    form: FormInstance;
};

export type StepsFormSF = Omit<UseStepsFormSFReturn, "form"> & {
    form: FormInstance;
};

export type ModalFormSF = Omit<UseModalFormSFReturn, "form"> & {
    form: FormInstance;
};

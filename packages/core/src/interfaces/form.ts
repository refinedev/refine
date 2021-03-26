import { useForm, useStepsForm } from "sunflower-antd";
import { FormInstance } from "antd";

export type FormSF = Omit<ReturnType<typeof useForm>, "form"> & {
    form: FormInstance;
};

export type StepsFormSF = Omit<ReturnType<typeof useStepsForm>, "form"> & {
    form: FormInstance;
};

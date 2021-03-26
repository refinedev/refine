import { useForm } from "sunflower-antd";
import { FormInstance } from "antd";

export type FormSF = Omit<ReturnType<typeof useForm>, "form"> & {
    form: FormInstance;
};

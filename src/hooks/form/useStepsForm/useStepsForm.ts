import { useStepsForm as useStepsFormSF } from "sunflower-antd";

import { Form } from "antd";

import { useForm } from "@hooks";
import { useEditForm } from "../useEditForm";

type useStepsProps = {};

export const useStepsForm = () => {
    const form = useForm({});

    const stepsPropsSunflower = useStepsFormSF({
        form: form.form,
        submit: (values) => {
            form.formProps?.onFinish(values as any);
        },
    });

    return {
        ...stepsPropsSunflower,
    };
};

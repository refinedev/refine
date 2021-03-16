import { useStepsForm as useStepsFormSF } from "sunflower-antd";

import { useForm } from "@hooks";

type useStepsProps = {};

export const useStepsForm = () => {
    const { form, formProps } = useForm({});

    const stepsPropsSunflower = useStepsFormSF({ form, submit: () => {} });

    return {
        ...stepsPropsSunflower,
        formProps: {
            ...stepsPropsSunflower.formProps,
            onFinish: formProps?.onFinish,
        },
    };
};

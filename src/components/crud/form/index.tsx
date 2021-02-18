import React from "react";
import { Form as AntdForm } from "antd";
import {
    FormInstance,
    FormItemProps,
    FormProps as AntdFormProps,
} from "antd/lib/form";

export interface FormProps extends AntdFormProps {
    onFinish?: (values: object) => void;
    form?: FormInstance;
}

export const Form: React.FC<FormProps> = ({
    onFinish,
    form,
    children,
    ...rest
}) => {
    return (
        <AntdForm {...rest} form={form} onFinish={onFinish}>
            {children}
        </AntdForm>
    );
};

export const FormItem: React.FC<FormItemProps> = ({ ...rest }) => {
    return <AntdForm.Item {...rest} />;
};

import React from "react";
import { Form as AntdForm } from "antd";
import { FormItemProps, FormProps } from "antd/lib/form";

export const Form: React.FC<FormProps> = ({ children, ...rest }) => {
    return (
        <AntdForm
            {...rest}
            onFinish={(values) => console.log("values", values)}
        >
            {children}
        </AntdForm>
    );
};

export const FormItem: React.FC<FormItemProps> = ({ ...rest }) => {
    return <AntdForm.Item {...rest} />;
};

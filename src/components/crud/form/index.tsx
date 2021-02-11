import React from "react";
import { Form as AntdForm, Button } from "antd";
import {
    FormInstance,
    FormItemProps,
    FormProps as AntdFormProps,
} from "antd/lib/form";
import { SaveOutlined } from "@ant-design/icons";

export interface FormProps extends AntdFormProps {
    onFinish?: (values: object) => void;
    form?: FormInstance;
    error?: any;
    isLoading?: boolean;
}

export const Form: React.FC<FormProps> = ({
    onFinish,
    form,
    isLoading,
    error,
    children,
    ...rest
}) => {
    return (
        <section>
            {error && <span>{JSON.stringify(error)}</span>}
            <AntdForm {...rest} form={form} onFinish={onFinish}>
                {children}
                <FormItem>
                    <Button
                        htmlType="submit"
                        disabled={isLoading}
                        type="primary"
                        icon={<SaveOutlined />}
                    >
                        Save
                    </Button>
                </FormItem>
            </AntdForm>
        </section>
    );
};

export const FormItem: React.FC<FormItemProps> = ({ ...rest }) => {
    return <AntdForm.Item {...rest} />;
};

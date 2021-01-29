import React, { useContext } from "react";
import { Form as AntdForm, Button } from "antd";
import { FormItemProps, FormProps as AntdFormProps } from "antd/lib/form";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { DataContext } from "@contexts/data";
import { IDataContext } from "@interfaces";

export interface FormProps extends AntdFormProps {
    resourceName?: string;
}

export const Form: React.FC<FormProps> = ({
    resourceName,
    children,
    ...rest
}) => {
    if (!resourceName) {
        return null;
    }

    // const [form] = AntdForm.useForm();

    const { create } = useContext<IDataContext>(DataContext);
    const history = useHistory();

    const mutation = useMutation(
        ({ resourceName, values }: { resourceName: string; values: string }) =>
            create(resourceName, values),
        {
            onSuccess: () => {
                return history.push(`/resources/${resourceName}`);
            },
        },
    );

    const onFinish = async (values: any) => {
        mutation.mutate({ resourceName, values });
    };

    return (
        <section>
            {mutation.isError && <span>{JSON.stringify(mutation.error)}</span>}
            <AntdForm {...rest} onFinish={onFinish}>
                {children}
                <FormItem>
                    <Button
                        htmlType="submit"
                        disabled={mutation.isLoading}
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

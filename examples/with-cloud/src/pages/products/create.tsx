import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Create } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useCloudMutation } from "@refinedev/cloud";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const [form] = Form.useForm();
    const { mutate, isLoading } = useCloudMutation();

    // eslint-disable-next-line
    const onFinish = (values: any) => {
        const { name, price } = values;
        mutate(
            {
                key: "postgresql-create-product",
                config: {},
                customParams: {
                    name,
                    price,
                },
            },
            {
                onSuccess: () => list("products"),
            },
        );
    };

    return (
        <Create
            saveButtonProps={{
                disabled: isLoading,
                onClick: () => {
                    form.submit();
                },
            }}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

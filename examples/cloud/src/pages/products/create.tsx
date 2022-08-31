import React from "react";
import { IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { Create, Form, Input } from "@pankod/refine-antd";
import { useCloudMutation } from "@pankod/refine-cloud";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const [form] = Form.useForm();
    const { mutate, isLoading } = useCloudMutation();

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

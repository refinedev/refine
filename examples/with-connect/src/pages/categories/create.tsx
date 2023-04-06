import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Create } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useConnectMutation } from "@refinedev/connect";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const [form] = Form.useForm();
    const { mutate, isLoading } = useConnectMutation();

    // eslint-disable-next-line
    const onFinish = (values: any) => {
        const { title } = values;
        mutate(
            {
                key: "default-restapi-create-category",
                config: {},
                customParams: {
                    title,
                },
            },
            {
                onSuccess: () => list("categories"),
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
                    label="Title"
                    name="title"
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

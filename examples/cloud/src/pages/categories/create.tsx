import React from "react";
import { IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { Create, Form, Input } from "@pankod/refine-antd";
import { useCloudMutation } from "@pankod/refine-cloud";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const [form] = Form.useForm();
    const { mutate, isLoading } = useCloudMutation();

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

import React, { useEffect } from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    useResource,
} from "@pankod/refine-core";
import { Edit, Form, Input } from "@pankod/refine-antd";

import { IProduct } from "interfaces";
import { useCloudMutation } from "@pankod/refine-cloud";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { id } = useResource();
    const { mutate } = useCloudMutation<IProduct[]>();
    const { mutate: updateMutate } = useCloudMutation<IProduct[]>();
    const [form] = Form.useForm();

    useEffect(() => {
        mutate(
            {
                key: "default-restapi-category",
                customParams: {
                    id,
                },
            },
            {
                onSuccess: (data) => form.setFieldsValue(data),
            },
        );
    }, []);

    const onFinish = (values: any) => {
        const { title } = values;
        updateMutate(
            {
                key: "default-restapi-update-category",
                customParams: {
                    title,
                    id,
                },
            },
            {
                onSuccess: () => list("categories"),
            },
        );
    };

    return (
        <Edit
            saveButtonProps={{
                onClick: () => form.submit(),
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
        </Edit>
    );
};

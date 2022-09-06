import React, { useEffect } from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    useResource,
} from "@pankod/refine-core";
import { Edit, Form, Input } from "@pankod/refine-antd";

import { IProduct } from "interfaces";
import { useCloudMutation } from "@pankod/refine-cloud";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { id } = useResource();
    const { mutate } = useCloudMutation<IProduct[]>();
    const { mutate: updateMutate } = useCloudMutation<IProduct[]>();
    const [form] = Form.useForm();

    useEffect(() => {
        mutate(
            {
                key: "postgresql-product",
                customParams: {
                    id,
                },
            },
            {
                onSuccess: (data) => form.setFieldsValue(data[0]),
            },
        );
    }, []);

    const onFinish = (values: any) => {
        const { name, price } = values;
        updateMutate(
            {
                key: "postgresql-update-product",
                customParams: {
                    name,
                    price,
                    id,
                },
            },
            {
                onSuccess: () => list("products"),
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
        </Edit>
    );
};

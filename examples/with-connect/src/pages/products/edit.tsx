import React, { useEffect } from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    useResource,
} from "@refinedev/core";
import { Edit } from "@refinedev/antd";

import { Form, Input } from "antd";

import { IProduct } from "interfaces";
import { useConnectMutation } from "@refinedev/connect";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { id } = useResource();
    const { mutate } = useConnectMutation<IProduct[]>();
    const { mutate: updateMutate } = useConnectMutation<IProduct[]>();
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

    // eslint-disable-next-line
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

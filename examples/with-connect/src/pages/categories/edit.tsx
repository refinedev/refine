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

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { id } = useResource();
    const { mutate } = useConnectMutation<IProduct[]>();
    const { mutate: updateMutate } = useConnectMutation<IProduct[]>();
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

    // eslint-disable-next-line
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

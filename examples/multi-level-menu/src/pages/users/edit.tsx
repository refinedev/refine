import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import { IUser } from "interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IUser>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
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

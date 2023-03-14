import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IMail } from "interfaces";

export const MailCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IMail>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Body"
                    name="text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
            </Form>
        </Create>
    );
};

export default MailCreate;

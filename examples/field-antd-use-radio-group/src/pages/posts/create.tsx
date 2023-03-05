import { useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm, useRadioGroup } from "@refinedev/antd";

import { Form, Input, Radio } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ILanguage } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { radioGroupProps: languageRadioGroupProps } =
        useRadioGroup<ILanguage>({
            resource: "languages",
            sort: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                <Form.Item
                    label="Language"
                    name="language"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group {...languageRadioGroupProps} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
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

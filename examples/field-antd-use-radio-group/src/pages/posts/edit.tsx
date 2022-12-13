import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    useForm,
    useRadioGroup,
    Radio,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ILanguage } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { radioGroupProps: languageRadioGroupProps } =
        useRadioGroup<ILanguage>({
            resource: "languages",
        });

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
        </Edit>
    );
};

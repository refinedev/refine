import React, { useState } from "react";
import { IResourceComponentsProps, useApiUrl } from "@pankod/refine-core";
import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    Upload,
} from "@pankod/refine-antd";
import {
    useStrapiUpload,
    getValueProps,
    mediaUploadMapper,
} from "@pankod/refine-strapi";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import { TOKEN_KEY } from "../../constants";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const API_URL = useApiUrl();

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const { formProps, saveButtonProps } = useForm();

    const { selectProps } = useSelect({
        resource: "categories",
    });

    const { ...uploadProps } = useStrapiUpload({
        maxCount: 1,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    return (
                        formProps.onFinish &&
                        formProps.onFinish(mediaUploadMapper(values))
                    );
                }}
            >
                <Form.Item
                    wrapperCol={{ span: 14 }}
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
                    wrapperCol={{ span: 8 }}
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...selectProps} />
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
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>
                <Form.Item label="Cover">
                    <Form.Item
                        name="cover"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/upload`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                            {...uploadProps}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};

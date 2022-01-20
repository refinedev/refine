import React, { useState } from "react";
import { IResourceComponentsProps, useApiUrl } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import {
    useStrapiUpload,
    mediaUploadMapper,
    getValueProps,
} from "@pankod/refine-strapi";

import { TOKEN_KEY } from "../../constants";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const API_URL = useApiUrl();

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const { formProps, saveButtonProps, queryResult } = useForm();

    const postData = queryResult?.data?.data;
    const { selectProps } = useSelect({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const { ...uploadProps } = useStrapiUpload({
        maxCount: 1,
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
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
        </Create>
    );
};

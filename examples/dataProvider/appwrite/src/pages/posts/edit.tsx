import React, { useState } from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    RcFile,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, IPostVariables, ICategory } from "interfaces";
import { normalizeFile, storage } from "utility";

export const PostsEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<
        IPost,
        HttpError,
        IPostVariables
    >({
        queryOptions: {
            select: ({ data }) => {
                return {
                    data: {
                        ...data,
                        images: data.images
                            ? JSON.parse(data.images)
                            : undefined,
                    },
                };
            },
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "61c43adc284ac",
        defaultValue: postData?.categoryId,
        optionLabel: "title",
        optionValue: "id",
    });

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        images: JSON.stringify(values.images),
                    });
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
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
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
                <Form.Item label="Images">
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    const { $id } = await storage.createFile(
                                        "default",
                                        rcFile.name,
                                        rcFile,
                                    );

                                    const url = storage.getFileView(
                                        "default",
                                        $id,
                                    );

                                    onSuccess?.({ url }, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};

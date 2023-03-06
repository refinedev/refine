import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { RcFile } from "antd/lib/upload/interface";
import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { nhost, normalizeFile } from "utility";
import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        metaData: {
            fields: ["id", "title"],
        },
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
                    label="Category"
                    name="category_id"
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
                    <MDEditor data-color-mode="light" />
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
                                const rcFile = file as RcFile;

                                const { fileMetadata, error } =
                                    await nhost.storage.upload({
                                        file: rcFile,
                                    });

                                if (error) {
                                    return onError?.(error);
                                }

                                if (fileMetadata) {
                                    const url = nhost.storage.getUrl({
                                        fileId: fileMetadata.id,
                                    });

                                    onSuccess?.(
                                        { url, fileId: fileMetadata.id },
                                        new XMLHttpRequest(),
                                    );
                                }
                            }}
                            // eslint-disable-next-line
                            onRemove={async (props: any) => {
                                await nhost.storage.delete({
                                    fileId: props.fileId,
                                });
                            }}
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

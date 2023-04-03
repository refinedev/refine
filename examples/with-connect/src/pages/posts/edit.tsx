import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@refinedev/antd";
import { RcFile } from "antd/lib/upload/interface";
import { Form, Input, Select, Row, Col, Upload } from "antd";
import { useForm, useSelect } from "@refinedev/antd";
import { LogList } from "@refinedev/antd-audit-log";

import { useSdk } from "@refinedev/connect";
import MDEditor from "@uiw/react-md-editor";

import { normalizeFile } from "utility/normalize";
import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { sdk } = useSdk();

    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        warnWhenUnsavedChanges: true,
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <Row gutter={16}>
            <Col span={18}>
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
                            label="Category"
                            name={["category", "id"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select {...categorySelectProps} />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Published",
                                        value: "published",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                    },
                                    {
                                        label: "Rejected",
                                        value: "rejected",
                                    },
                                ]}
                            />
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
                                        const bucket = "test1";
                                        try {
                                            await sdk.storage.upload({
                                                bucket,
                                                file,
                                            });

                                            // get uploaded file url
                                            const path = (file as RcFile).name;
                                            const { url } =
                                                await sdk.storage.getPublicUrl({
                                                    bucket,
                                                    path,
                                                });

                                            const xhr = new XMLHttpRequest();
                                            onSuccess &&
                                                onSuccess({ url }, xhr);
                                        } catch (error) {
                                            onError &&
                                                onError(
                                                    new Error("Upload Error"),
                                                );
                                        }
                                    }}
                                >
                                    <p className="ant-upload-text">
                                        Drag & drop a file in this area
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Edit>
            </Col>
            <Col span={6}>
                <LogList />
            </Col>
        </Row>
    );
};

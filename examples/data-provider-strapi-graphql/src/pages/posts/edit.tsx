import React from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";

import {
    Edit,
    ListButton,
    RefreshButton,
    useForm,
    useSelect,
} from "@refinedev/antd";

import { Form, Input, Select, Space } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<
        IPost,
        HttpError,
        IPost
    >({
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["id", "title"],
                },
                "content",
            ],
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category?.id,
        metaData: {
            fields: ["id", "title"],
        },
    });

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            headerProps={{
                extra: (
                    <Space>
                        <ListButton />
                        <RefreshButton onClick={() => queryResult?.refetch()} />
                    </Space>
                ),
            }}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) =>
                    formProps.onFinish?.({
                        ...values,
                        category: values.category?.id,
                    } as any)
                } // eslint-disable-line
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
            </Form>
        </Edit>
    );
};

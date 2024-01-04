import React from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";

import {
    Edit,
    ListButton,
    RefreshButton,
    useForm,
    useSelect,
} from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "../../interfaces";
import { POST_CATEGORIES_SELECT_QUERY, POST_UPDATE_MUTATION } from "./queries";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult, formLoading } = useForm<
        IPost,
        HttpError,
        IPost
    >({
        queryOptions: {},
        metaData: {
            gqlMutation: POST_UPDATE_MUTATION,
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category_id,
        metaData: {
            gqlQuery: POST_CATEGORIES_SELECT_QUERY,
        },
    });

    return (
        <Edit
            isLoading={formLoading}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                        <RefreshButton onClick={() => queryResult?.refetch()} />
                    </>
                ),
            }}
            saveButtonProps={saveButtonProps}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) =>
                    formProps.onFinish?.({
                        ...values,
                    })
                }
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
            </Form>
        </Edit>
    );
};

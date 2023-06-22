import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import {
    Edit,
    useForm,
    useSelect,
    LoadingOvertime,
    overtimeComponents,
} from "@refinedev/antd";

import { Form, Input, Select, Alert } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "../../interfaces";

const customOvertimeComponents = {
    ...overtimeComponents,
    1000: (
        <Alert
            message="The form loading..."
            type="warning"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
        />
    ),
    2000: (
        <Alert
            message="Still loading..."
            type="warning"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
        />
    ),
    4000: (
        <Alert
            message="This is taking a while..."
            type="warning"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
        />
    ),
};

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        warnWhenUnsavedChanges: true,
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <LoadingOvertime
                overtimeComponents={customOvertimeComponents}
                isLoading={queryResult?.isLoading}
            >
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
                </Form>
            </LoadingOvertime>
        </Edit>
    );
};

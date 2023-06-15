"use client";

import { useForm, useSelect, Edit } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { IPost } from "src/interfaces";

const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
        defaultValue: queryResult?.data?.data?.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
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
                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export default PostEdit;

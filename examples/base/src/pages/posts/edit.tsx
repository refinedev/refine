import React, { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    SaveButton,
    Select,
    Space,
} from "@pankod/refine-antd";

import { useForm, useSelect } from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult, onFinish, redirect } =
        useForm<IPost>({
            warnWhenUnsavedChanges: true,
            mutationMode: "optimistic",
            onMutationSuccess: (data, data2, data3) => {
                console.log("Mutation success", { data, data2, data3 });
            },
            redirect: false,
        });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Edit
            actionButtons={
                <Space>
                    <SaveButton {...saveButtonProps} onClick={() => onFinish()}>
                        Save and continue editing
                    </SaveButton>
                    <SaveButton
                        {...saveButtonProps}
                        onClick={async () => {
                            await onFinish?.();
                            redirect("create");
                        }}
                    >
                        Save and add another
                    </SaveButton>
                    <SaveButton
                        {...saveButtonProps}
                        onClick={async () => {
                            await onFinish?.();
                            redirect("show");
                        }}
                    />
                </Space>
            }
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
            </Form>
        </Edit>
    );
};

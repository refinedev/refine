import { useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("posts.fields.title")}
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
                    label={translate("posts.fields.category")}
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
                    label={translate("posts.fields.status.title")}
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
                                label: translate(
                                    "posts.fields.status.published",
                                ),
                                value: "published",
                            },
                            {
                                label: translate("posts.fields.status.draft"),
                                value: "draft",
                            },
                            {
                                label: translate(
                                    "posts.fields.status.rejected",
                                ),
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label={translate("posts.fields.content")}
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

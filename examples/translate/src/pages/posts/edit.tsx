import { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useForm,
    useSelect,
    useTranslate,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostEdit = (props: IResourceComponentsProps) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );

    return (
        <Edit
            {...props}
            saveButtonProps={saveButtonProps}
            title={translate("resources:posts.titles.edit")}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("resources:posts.fields.title")}
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
                    label={translate("resources:posts.fields.category")}
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
                    label={translate("resources:posts.fields.status.title")}
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
                                    "resources:posts.fields.status.published",
                                ),
                                value: "published",
                            },
                            {
                                label: translate(
                                    "resources:posts.fields.status.draft",
                                ),
                                value: "draft",
                            },
                            {
                                label: translate(
                                    "resources:posts.fields.status.rejected",
                                ),
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label={translate("resources:posts.fields.content")}
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

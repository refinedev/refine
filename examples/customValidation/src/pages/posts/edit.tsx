import { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useApiUrl,
    useCustom,
    useForm,
    useSelect,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostEdit = (props: IResourceComponentsProps) => {
    const { form, formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );

    const apiUrl = useApiUrl();
    const url = `${apiUrl}/posts`;

    const title = form.getFieldValue("title");
    const { refetch } = useCustom<IPost[]>(
        url,
        "get",
        {
            filters: [
                {
                    field: "title",
                    operator: "eq",
                    value: title,
                },
            ],
        },
        {
            enabled: false,
        },
    );

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            validator: async (_, value) => {
                                if (!value) return;

                                const { data } = await refetch();

                                if (data) {
                                    const postLength = data.data.length;
                                    if (postLength > 0) {
                                        return Promise.reject(
                                            new Error(
                                                "'title' is must be unique",
                                            ),
                                        );
                                    }
                                }

                                return Promise.resolve();
                            },
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

import React from "react";
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

export const PostCreate = (props: IResourceComponentsProps) => {
    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );

    const { formProps, saveButtonProps, queryResult } = useForm({});

    const postData = queryResult?.data?.data;
    const { selectProps } = useSelect({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    wrapperCol={{ span: 14 }}
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
                <Form.Item
                    wrapperCol={{ span: 8 }}
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select showSearch filterOption={false} {...selectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};

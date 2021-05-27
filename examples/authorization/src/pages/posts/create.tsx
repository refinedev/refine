import React from "react";
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useForm,
    usePermissions,
    useSelect,
    Result
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostCreate = (props: IResourceComponentsProps) => {
    const { data: permissionsData, isLoading } = usePermissions();

    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        permissionsData?.includes("admin")
            ?
            <Create {...props} saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Title"
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
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            filterOption={false}
                            {...categorySelectProps}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
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
            </Create>
            :
            <Result />
    );
};

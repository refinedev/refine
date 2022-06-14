import { useState } from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useApiUrl,
    useCustom,
} from "@pankod/refine-core";

import {
    Create,
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

interface PostUniqueCheckResponse {
    isAvailable: boolean;
}

interface PostUniqueCheckRequestQuery {
    title: string;
}

export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const apiUrl = useApiUrl();
    const url = `${apiUrl}/posts-unique-check`;

    const [title, setTitle] = useState("");

    const { refetch } = useCustom<
        PostUniqueCheckResponse,
        HttpError,
        PostUniqueCheckRequestQuery
    >({
        url,
        method: "get",
        config: {
            query: {
                title,
            },
        },
        queryOptions: {
            enabled: false,
        },
    });

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            validator: async (_, value) => {
                                if (!value) return;

                                const { data } = await refetch();

                                if (data && data.data.isAvailable) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error("'title' is must be unique"),
                                );
                            },
                        },
                    ]}
                >
                    <Input onChange={(event) => setTitle(event.target.value)} />
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
        </Create>
    );
};

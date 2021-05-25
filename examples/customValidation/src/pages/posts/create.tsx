import { useEffect, useState } from "react";
import {
    Create,
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

export const PostCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );

    const apiUrl = useApiUrl();
    const url = `${apiUrl}/posts`;

    const [title, setTitle] = useState("");
    const [validationStatus, setValidationStatus] = useState<
        "" | "success" | "warning" | "error" | "validating"
    >();
    const [titleHelp, setTitleHelp] = useState<string | undefined>();
    const { data, refetch } = useCustom<IPost[]>(
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
            sort: {
                field: "id",
                order: "ascend",
            },
        },
        {
            enabled: !!title,
        },
    );

    useEffect(() => {
        refetch();
    }, [title]);

    useEffect(() => {
        if (data) {
            const postLength = data.data.length;
            if (postLength > 0) {
                setValidationStatus("error");
                setTitleHelp("'title' is must be unique");
            } else {
                setValidationStatus(undefined);
                setTitleHelp(undefined);
            }
        }
    }, [data]);

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
                    ]}
                    help={titleHelp}
                    validateStatus={validationStatus}
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

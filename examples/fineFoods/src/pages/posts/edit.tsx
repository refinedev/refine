import { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    useTranslate,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = (props) => {
    const { formProps } = useForm<IPost>();
    const t = useTranslate();

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );

    return (
        <Edit {...props}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    wrapperCol={{ span: 14 }}
                    label={t("posts.fields.title")}
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
                    label={t("posts.fields.content")}
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

import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import { IPost, ICategory } from "../../interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Create>
    );
};

import { useForm, Create, Form, Input, Select, useSelect } from "@pankod/refine";

import { IPost } from "../../interfaces";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>({});

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
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
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                >
                    <Select
                        showSearch
                        filterOption={false}
                        {...categorySelectProps}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
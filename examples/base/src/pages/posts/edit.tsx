import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine";

export const PostEdit = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});

    const { selectProps } = useSelect({
        resource: "categories",
    });

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" wrapperCol={{ span: 8 }}>
                <Form.Item
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
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};

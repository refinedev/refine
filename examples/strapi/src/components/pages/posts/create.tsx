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
                    <Input.TextArea style={{ minHeight: 200 }} />
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

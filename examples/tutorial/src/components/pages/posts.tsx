import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    IResourceComponentsProps,
    useForm,
    Create,
    Form,
    Input,
    Select
} from "@pankod/refine";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable({});

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
            </Table>
        </List>
    );
};

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
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
                        ]} />
                </Form.Item>
            </Form>
        </Create>
    )
}
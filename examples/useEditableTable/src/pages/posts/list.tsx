import {
    List,
    Table,
    Form,
    Space,
    Button,
    SaveButton,
    EditButton,
    Input,
    TextField,
    useEditableTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const {
        tableProps,
        formProps,
        isEditing,
        setEditId,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();

    return (
        <List {...props}>
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    key="id"
                    onRow={(record) => ({
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                >
                    <Table.Column<IPost> key="id" dataIndex="id" title="ID" />
                    <Table.Column<IPost>
                        key="title"
                        dataIndex="title"
                        title="Title"
                        render={(value, data: any) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return <TextField value={value} />;
                        }}
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_text, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <Space>
                                    <EditButton
                                        {...editButtonProps(record.id)}
                                        size="small"
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};

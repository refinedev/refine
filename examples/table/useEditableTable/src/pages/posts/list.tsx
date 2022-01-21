import { IResourceComponentsProps } from "@pankod/refine-core";

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
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableProps,
        formProps,
        isEditing,
        setId: setEditId,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();

    return (
        <List>
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                >
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column<IPost>
                        dataIndex="title"
                        title="Title"
                        render={(value, record) => {
                            if (isEditing(record.id)) {
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
                        render={(_, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            hideText
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
                                <EditButton
                                    {...editButtonProps(record.id)}
                                    hideText
                                    size="small"
                                />
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};

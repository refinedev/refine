import * as React from "react";
import {
    List,
    Table,
    Column,
    Create,
    Edit,
    Form,
    TextField,
    Input,
    useApiUrl,
} from "readmin";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 5,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    dataIndex="id"
                    title="ID"
                    key="id"
                    sorter
                    defaultSortOrder="ascend"
                />
                <Column
                    dataIndex="title"
                    title="Title"
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter
                />
                <Column
                    dataIndex="views"
                    title="Views"
                    key="views"
                    render={(value) => <TextField value={value} />}
                    sorter
                />
                <Column
                    dataIndex="User.name"
                    title="User"
                    key="userName"
                    render={(value, record) => {
                        return (
                            <TextField
                                record={record.User}
                                renderRecordKey="name"
                            />
                        );
                    }}
                    sorter
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
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
            </Form>
        </Create>
    );
};

export const PostEdit = (props: any) => {
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
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
            </Form>
        </Edit>
    );
};

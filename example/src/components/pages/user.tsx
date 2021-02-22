import * as React from "react";
import {
    List,
    Table,
    Column,
    EmailField,
    TagField,
    DateField,
    Edit,
    Form,
    FormItem,
    BooleanInput,
    TextInput,
} from "readmin";

export const UserList = (props: any) => {
    return (
        <List {...props}>
            <Table rowKey="id">
                <Column key="id" dataIndex="id" title="ID" />
                <Column
                    key="firstName"
                    dataIndex="firstName"
                    title="First Name"
                />
                <Column key="lastName" dataIndex="lastName" title="Last Name" />
                <Column
                    dataIndex="status"
                    title="Status"
                    key="status"
                    render={(value) => <TagField value={value} />}
                />
                <Column
                    key="email"
                    dataIndex="email"
                    title="Email"
                    render={(value) => <EmailField value={value} />}
                />

                <Column
                    key="birthday"
                    dataIndex="birthday"
                    title="Birthday"
                    render={(value) => <DateField value={value} />}
                />
            </Table>
        </List>
    );
};

export const UserEdit = (props: any) => {
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
                </FormItem>
                <FormItem
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <BooleanInput />
                </FormItem>
            </Form>
        </Edit>
    );
};

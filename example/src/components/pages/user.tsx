import * as React from "react";
import { List, Table, Column, EmailField, TagField } from "readmin";

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
            </Table>
        </List>
    );
};

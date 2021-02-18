import * as React from "react";
import { List, Table, Column, EmailField } from "readmin";

export const UserList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" dataIndex="id" title="ID" />
                <Column
                    key="firstName"
                    dataIndex="firstName"
                    title="First Name"
                />
                <Column key="lastName" dataIndex="lastName" title="Last Name" />
                <Column key="status" dataIndex="status" title="Status" />
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

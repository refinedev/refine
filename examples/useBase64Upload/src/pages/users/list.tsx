import { useState } from "react";

import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    DeleteButton,
    EmailField,
} from "@pankod/refine";

// import { IPost, ICategory } from "../../interfaces";

export const UserList: React.FC<IResourceComponentsProps>  = (props) => {
    const { tableProps } = useTable();

    return (
        <List {...props}>
            <Table
                {...tableProps}
                rowKey="id"
                // pagination={{
                //     ...tableProps.pagination,
                //     position: ["bottomCenter"],
                //     size: "small",
                // }}
                // scroll={{
                //     x: true,
                // }}
            >
                <Table.Column
                    key="firstName"
                    dataIndex="firstName"
                    title="First Name"
                />
                <Table.Column
                    key="lastName"
                    dataIndex="lastName"
                    title="Last Name"
                />
                <Table.Column
                    key="email"
                    dataIndex="email"
                    title="Email"
                    render={(value) => <EmailField value={value} />}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string;
                        },
                    ): React.ReactNode => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <DeleteButton
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    ShowButton,
    TagField,
} from "@pankod/refine";

import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IUser>();

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
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
                <Table.Column key="email" dataIndex="email" title="Email" />
                <Table.Column
                    key="status"
                    dataIndex="status"
                    title="Status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column<IUser>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

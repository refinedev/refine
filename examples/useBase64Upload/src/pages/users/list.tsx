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

import { IUser } from "../../interfaces";

export const UserList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IUser>();

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
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
                <Table.Column<IUser>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
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

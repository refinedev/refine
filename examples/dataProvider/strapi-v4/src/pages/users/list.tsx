import { IResourceComponentsProps } from "@pankod/refine-core";

import { List, Table, useTable } from "@pankod/refine-antd";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable({
        hasPagination: false,
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" key="id" title="ID" />
                <Table.Column
                    dataIndex="username"
                    key="name"
                    title="Username"
                />
                <Table.Column dataIndex="email" key="email" title="Email" />
            </Table>
        </List>
    );
};

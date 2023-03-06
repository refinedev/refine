import { IResourceComponentsProps } from "@refinedev/core";

import { List, useTable } from "@refinedev/antd";

import { Table } from "antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>({
        initialPageSize: 50,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

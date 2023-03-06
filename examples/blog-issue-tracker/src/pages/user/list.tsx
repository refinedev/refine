import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { useTable, List } from "@refinedev/antd";

import { Table } from "antd";

import { IAuthUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IAuthUser>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="id" title="ID" />
            </Table>
        </List>
    );
};

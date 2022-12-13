import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { useTable, List, Table, DateField } from "@pankod/refine-antd";

import { IMail } from "interfaces";

export const MessageList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IMail>();
    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="subject" title="Subject" />
                <Table.Column dataIndex="text" title="Body" />
                <Table.Column
                    dataIndex="created_at"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
            </Table>
        </List>
    );
};

export default MessageList;

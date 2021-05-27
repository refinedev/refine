import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";
import React from "react";

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>({
        initialPageSize: 50,
    });

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

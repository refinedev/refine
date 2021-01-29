import React from "react";
import { List, Table, Column } from "readmin";

export const CategoryList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
            </Table>
        </List>
    );
};

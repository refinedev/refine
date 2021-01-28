import React from "react";
import { List, Column } from "readmin";

export const CategoryList = (props: any) => {
    return (
        <List {...props}>
            <Column key="id" title="ID" dataIndex="id" />
            <Column key="title" title="Title" dataIndex="title" />
        </List>
    );
};

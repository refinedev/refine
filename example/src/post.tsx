import React from "react";
import { List, Column, Table } from "readmin";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
                <Column
                    key="slug"
                    title="Slug"
                    dataIndex="slug"
                    render={(text: any, record: any) => (
                        <div>
                            <p>{text}</p>
                            <p>{record.title}</p>
                        </div>
                    )}
                />
            </Table>
        </List>
    );
};

import * as React from "react";
import { List, Table, Column, FileField } from "readmin";

export const FilesList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" dataIndex="id" title="ID" />
                <Column
                    key="url"
                    dataIndex="url"
                    title="Image"
                    render={(value, record) => (
                        <FileField record={record} download value={value} title="File"/>
                    )}
                />
                <Column
                    key="url"
                    dataIndex="url"
                    title="Image"
                    render={(value, record) => (
                        <FileField record={record} value={value} title="title" target="_blank" rel="noopener" />
                    )}
                />
            </Table>
        </List>
    );
};

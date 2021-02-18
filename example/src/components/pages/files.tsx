import * as React from "react";
import { List, Table, TextField, FileField } from "readmin";

export const FilesList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <TextField source="id" title="ID" />
                <FileField download source="url" title="Image"  />
                <FileField source="url" title="title" target="_blank" rel="noopener" />
            </Table>
        </List>
    );
};

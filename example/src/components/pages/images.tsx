import * as React from "react";
import { List, Table, TextField, ImageField } from "readmin";

export const ImagesList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <TextField source="id" title="ID" />
                <ImageField data-testid="image" source="url" title="Image" imageTitle="meow" width={200} />
            </Table>
        </List>
    );
};

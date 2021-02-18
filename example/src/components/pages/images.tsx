import * as React from "react";
import { List, Table, Column, ImageField } from "readmin";

export const ImagesList = (props: any) => {
    return (
        <List {...props}>
            <Table rowKey="id">
                <Column key="id" title="ID" dataIndex="id" />
                <Column
                    key="url"
                    title="Image"
                    dataIndex="url"
                    render={(value) => (
                        <ImageField
                            value={value}
                            title="Image"
                            imageTitle="meow"
                            width={200}
                            data-testid="image"
                        />
                    )}
                />
            </Table>
        </List>
    );
};

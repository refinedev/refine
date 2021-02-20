import * as React from "react";
import { List, Table, Column, ImageField, NumberField } from "readmin";

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
                <Column
                    key="price"
                    title="Price"
                    dataIndex="price"
                    render={(value) => (
                        <NumberField
                            value={value}
                            locale="de-DE"
                            options={{
                                style: "currency",
                                currency: "EUR",
                                maximumFractionDigits: 1,
                            }}
                        />
                    )}
                />
            </Table>
        </List>
    );
};

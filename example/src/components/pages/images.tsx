import * as React from "react";
import {
    List,
    Table,
    ImageField,
    NumberField,
    useTranslate,
    useTable,
} from "refinejs";

export const ImagesList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });
    return (
        <List {...props}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    key="id"
                    title={translate("common:resources.images.fields.id")}
                    dataIndex="id"
                />
                <Table.Column
                    key="url"
                    title={translate("common:resources.images.fields.image")}
                    dataIndex="url"
                    render={(value) => (
                        <ImageField
                            value={value}
                            title={translate(
                                "common:resources.images.fields.image",
                            )}
                            imageTitle="meow"
                            width={200}
                            data-testid="image"
                        />
                    )}
                />
                <Table.Column
                    key="price"
                    title={translate("common:resources.images.fields.price")}
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

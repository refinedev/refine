import * as React from "react";
import {
    List,
    Table,
    Column,
    ImageField,
    NumberField,
    useTranslate,
} from "readmin";

export const ImagesList = (props: any) => {
    const translate = useTranslate();
    return (
        <List {...props}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    key="id"
                    title={translate("common:resources.images.fields.id")}
                    dataIndex="id"
                />
                <Column
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
                <Column
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

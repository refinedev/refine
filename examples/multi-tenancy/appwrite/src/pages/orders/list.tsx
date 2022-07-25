import { useContext } from "react";
import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    TagField,
    TextField,
    Space,
    EditButton,
    DeleteButton,
    ImageField,
} from "@pankod/refine-antd";

import { IOrder, IProduct } from "interfaces";
import { StoreContext } from "context/store";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const [store] = useContext(StoreContext);
    const { tableProps } = useTable<IOrder>({
        permanentFilter: [{ field: "storeId", operator: "eq", value: store }],
    });

    const productIds =
        tableProps?.dataSource?.map((item) => item.productId) ?? [];

    const { data: productData, isLoading } = useMany<IProduct>({
        resource: "61cb01b17ef57",
        ids: productIds,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Order ID" />
                <Table.Column
                    dataIndex={["productId"]}
                    title="Product"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    productData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                />

                <Table.Column
                    dataIndex={["productId"]}
                    title="Product Image"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        const image = productData?.data.find(
                            (item) => item.id === value && item.image,
                        )?.image;

                        return (
                            <ImageField
                                value={
                                    image
                                        ? JSON.parse(image).map(
                                              (p: { url: string }) => p.url,
                                          )
                                        : undefined
                                }
                                width={72}
                                preview={{ mask: <></> }}
                            />
                        );
                    }}
                />

                <Table.Column dataIndex="quantitity" title="Quantitity" />

                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => {
                        return (
                            <TagField
                                value={value}
                                color={value === "delivered" ? "blue" : "red"}
                            />
                        );
                    }}
                />

                <Table.Column dataIndex="customerName" title="Customer Name" />
                <Table.Column
                    dataIndex="customerAddress"
                    title="Customer Address"
                />
                <Table.Column<IOrder>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => {
                        return (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};

import { IResourceComponentsProps, useMany, useParsed } from "@refinedev/core";
import {
    List,
    useTable,
    TagField,
    TextField,
    EditButton,
    DeleteButton,
    ImageField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import { IOrder, IProduct } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant?: string }>();
    const { tableProps } = useTable<IOrder>({
        filters: {
            permanent: [
                {
                    field: "storeId",
                    operator: "eq",
                    value: params?.tenant,
                },
            ],
        },
    });

    const productIds =
        tableProps?.dataSource?.map((item) => item.productId) ?? [];

    const { data: productData, isLoading } = useMany<IProduct>({
        resource: "products",
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
                                        : "/error.png"
                                }
                                width={72}
                                preview={{ mask: <></> }}
                            />
                        );
                    }}
                />

                <Table.Column dataIndex="quantity" title="Quantity" />

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

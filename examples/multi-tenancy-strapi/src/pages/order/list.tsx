import { IResourceComponentsProps, useParsed } from "@refinedev/core";
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

import { IOrder } from "interfaces";
import { API_URL } from "../../constants";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { tableProps } = useTable<IOrder>({
        permanentFilter: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
            },
        ],
        metaData: {
            populate: { product: { populate: ["image"] } },
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Order ID" />
                <Table.Column
                    dataIndex="product"
                    title="Product"
                    render={(value) => {
                        return value ? <TextField value={value.title} /> : "";
                    }}
                />

                <Table.Column
                    dataIndex={["product", "image"]}
                    title="Product Image"
                    render={(value) => {
                        return value ? (
                            <ImageField
                                value={API_URL + value.url}
                                width={72}
                                preview={{ mask: <></> }}
                            />
                        ) : (
                            <ImageField
                                value={"./error.png"}
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

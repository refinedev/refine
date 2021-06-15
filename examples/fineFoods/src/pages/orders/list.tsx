import {
    List,
    Table,
    TextField,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    getDefaultSortOrder,
    DateField,
    Popover,
} from "@pankod/refine";

import { IOrder } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps, sorter } = useTable<IOrder>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const t = useTranslate();

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="orderNumber"
                    dataIndex="orderNumber"
                    title={t("orders:fields.orderNumber")}
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="status.text"
                    dataIndex={["status", "text"]}
                    title={t("orders:fields.status")}
                    render={(value) => {
                        return <span>{value}</span>;
                    }}
                    defaultSortOrder={getDefaultSortOrder("status", sorter)}
                    sorter
                />
                <Table.Column
                    key="store.id"
                    dataIndex={["store", "title"]}
                    title={t("orders:fields.store")}
                />
                <Table.Column
                    key="user.id"
                    dataIndex="user"
                    title={t("orders:fields.user")}
                    render={(value) => (
                        <TextField value={`${value.name} ${value.surname}`} />
                    )}
                />
                <Table.Column<IOrder>
                    key="products"
                    dataIndex="products"
                    title={t("orders:fields.products")}
                    render={(_, record) => (
                        <Popover
                            content={record.products.map((product) => (
                                <div key={product.id}> - {product.name}</div>
                            ))}
                            title="Products"
                            trigger="hover"
                        >
                            {`${record.products.length} Items`}
                        </Popover>
                    )}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("orders:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
            </Table>
        </List>
    );
};

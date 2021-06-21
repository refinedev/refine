import {
    List,
    Table,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    DateField,
    Space,
    ShowButton,
    NumberField,
    BooleanField,
    EditButton,
} from "@pankod/refine";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IProduct>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const t = useTranslate();

    return (
        <List title={t("products:title")}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={t("products:fields.id")}
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title={t("products:fields.name")}
                />
                <Table.Column
                    align="right"
                    key="price"
                    dataIndex="price"
                    title={t("products:fields.price")}
                    render={(value) => {
                        return (
                            <NumberField
                                options={{
                                    currency: "USD",
                                    style: "currency",
                                    notation: "compact",
                                }}
                                value={value}
                            />
                        );
                    }}
                />
                <Table.Column
                    key="category"
                    dataIndex={["category", "title"]}
                    title={t("products:fields.category")}
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("products:fields.isActive")}
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("products:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IProduct>
                    title={t("common:table.actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

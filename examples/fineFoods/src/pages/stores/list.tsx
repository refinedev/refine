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

export const StoreList: React.FC<IResourceComponentsProps> = (props) => {
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
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={t("stores:fields.id")}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title={t("stores:fields.title")}
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("stores:fields.isActive")}
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("stores:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IProduct>
                    title="Actions"
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

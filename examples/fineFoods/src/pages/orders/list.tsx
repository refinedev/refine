import {
    List,
    Table,
    TextField,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    getDefaultSortOrder,
    DateField,
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
                    key="id"
                    dataIndex="id"
                    title={t("fine-foods:orders.fields:id")}
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter
                />
                <Table.Column
                    key="created_at"
                    dataIndex="created_at"
                    title={t("fine-foods:orders.fields:createdAt")}
                    render={(value) => (
                        <DateField value={value} format="YYYY-MM-DD HH:mm:ss" />
                    )}
                    sorter
                />
            </Table>
        </List>
    );
};

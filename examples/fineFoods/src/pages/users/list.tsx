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

import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps, sorter } = useTable<IUser>({
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
                    title={t("users:fields.id")}
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter
                />
                <Table.Column
                    key="created_at"
                    dataIndex="created_at"
                    title={t("users:fields.createdAt")}
                    render={(value) => (
                        <DateField value={value} format="YYYY-MM-DD HH:mm:ss" />
                    )}
                    sorter
                />
            </Table>
        </List>
    );
};

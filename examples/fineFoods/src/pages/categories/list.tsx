import {
    List,
    Table,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    Space,
    ShowButton,
    BooleanField,
    EditButton,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<ICategory>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
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
                    title={t("categories:fields.id")}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title={t("categories:fields.title")}
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("categories:fields.isActive")}
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column<ICategory>
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

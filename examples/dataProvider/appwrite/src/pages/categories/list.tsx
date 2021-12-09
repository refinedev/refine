import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    Space,
    EditButton,
    ShowButton,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoriesList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<ICategory>();

    return (
        <List title="Categories">
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="$id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("$id", sorter)}
                />
                <Table.Column dataIndex="title" title="Title" sorter />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.$id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.$id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoriesList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<ICategory>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    return (
        <List title="Categories">
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter
                />
            </Table>
        </List>
    );
};

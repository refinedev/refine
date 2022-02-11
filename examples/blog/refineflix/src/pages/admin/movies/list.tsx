import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    CreateButton,
    DeleteButton,
} from "@pankod/refine-antd";

import { IMovies } from "interfaces";

export const AdminMovieList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IMovies>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    return (
        <List pageHeaderProps={{ extra: <CreateButton /> }}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column key="name" dataIndex="name" title="name" sorter />

                <Table.Column<IMovies>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
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
                    )}
                />
            </Table>
        </List>
    );
};

import { IResourceComponentsProps, useExport } from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    ExportButton,
    ImportButton,
    CreateButton,
    useImport,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
            ],
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        metaData: {
            fields: ["id", "title"],
        },
    });

    const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
        mapData: (item) => {
            return {
                id: item.id,
                title: item.title,
                content: item.content,
                category: item.category?.id,
            };
        },
        metaData: {
            fields: ["id", "title", "content", { category: ["id"] }],
        },
    });

    const importProps = useImport<IPost>({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                category: item.category,
            };
        },
        batchSize: 100,
    });

    return (
        <List
            headerProps={{
                extra: (
                    <Space>
                        <ImportButton {...importProps} />
                        <ExportButton
                            onClick={triggerExport}
                            loading={exportLoading}
                        />
                        <CreateButton />
                    </Space>
                ),
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column<IPost>
                    dataIndex="category"
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                    render={(_, record) => record.category?.title}
                />
                <Table.Column<IPost>
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

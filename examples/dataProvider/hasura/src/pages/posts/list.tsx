import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    ExportButton,
    ImportButton,
    useExport,
    useImport,
    CreateButton,
    Input,
    getDefaultFilter,
    Button,
    useDeleteMany,
} from "@pankod/refine";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters, sorter } = useTable<IPost>({
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
                "content",
                "category_id",
            ],
        },
    });

    const deleteMany = useDeleteMany<IPost>();

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
                category_id: item.category_id,
            };
        },
        metaData: {
            fields: ["id", "title", "content", "category_id"],
        },
    });

    const importProps = useImport<IPost>({
        mapData: (item) => {
            return {
                title: item.title + Math.ceil(Math.random() * 1000),
                content: item.content,
                category_id: item.category_id,
            };
        },
        batchSize: 10,
    });

    const handleDeleteMany = () => {
        deleteMany.mutate({
            resource: "posts",
            ids: [
                "422bd8ed-396c-4164-8a51-31092a055ea4",
                "471e591b-2121-492f-9e9c-72840f59fc26",
            ],
        });
    };

    return (
        <List
            pageHeaderProps={{
                extra: (
                    <Space>
                        <ImportButton {...importProps} />
                        <ExportButton
                            onClick={triggerExport}
                            loading={exportLoading}
                        />
                        <Button onClick={handleDeleteMany}>Delete 2</Button>
                        <CreateButton />
                    </Space>
                ),
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 3 }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "content",
                        filters,
                        "eq",
                    )}
                />
                <Table.Column<IPost>
                    dataIndex="category_id"
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
                    render={(_, record) => record.category.title}
                    defaultFilteredValue={getDefaultFilter(
                        "category_id",
                        filters,
                        "in",
                    )}
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
                                metaData={{
                                    fields: [
                                        "id",
                                        "content",
                                        { category: ["id"] },
                                    ],
                                }}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    getDefaultSortOrder,
    getDefaultFilter,
    FilterDropdown,
    Select,
    useSelect,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "title",
                operator: "eq",
                value: "test title",
            },
        ],
    });

    // const categoryIds =
    //   tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    // const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
    //   enabled: categoryIds.length > 0
    // });

    const { selectProps } = useSelect<IPost>({
        resource: "posts",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 1 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                // mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
                {/* <Table.Column
            dataIndex={["category", "id"]}
            title="Category"
            render={(value) => {
              if (isLoading) {
                return <TextField value="Loading..." />;
              }
  
              return (
                <TextField
                  value={data?.data.find((item) => item.id === value)?.title}
                />
              );
            }}
          /> */}
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
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

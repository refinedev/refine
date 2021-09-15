import {
    List,
    Table,
    Radio,
    FilterDropdown,
    getDefaultFilter,
    TagField,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    FilterDropdownProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" sorter />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    key="content"
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    key="status"
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys) => {
                                return selectedKeys[0];
                            }}
                        >
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
            </Table>
        </List>
    );
};

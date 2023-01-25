```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
    IResourceComponentsProps,
    HttpError,
    useMany,
    getDefaultFilter,
} from "@pankod/refine-core";

import {
    List,
    Table,
    TagField,
    useTable,
    useSelect,
    FilterDropdown,
    Select,
} from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: {
        id: number;
    };
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters } = useTable<IPost, HttpError>();

    const categoryIds =
        tableProps.dataSource?.map((p) => p.category.id.toString()) || [];
    const { data, isFetching } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters, "in"),
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="content" title="Content" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isFetching) return "loading...";

                        return data?.data.find((p) => p.id === value)?.title;
                    }}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys) =>
                                selectedKeys.map((i) => parseInt(i.toString()))
                            }
                        >
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                />
            </Table>
        </List>
    );
};

// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

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
    useUpdateMany,
    Button,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const {
        mutate,
        isSuccess,
        isLoading: deleteManyIsLoading,
    } = useUpdateMany<IPost>("posts");

    return (
        <List {...props}>
            {/*         <div style={{ padding: "16px 8px" }}>
                <Button
                    type="primary"
                    onClick={deleteSelectedItems}
                    disabled={!hasSelected}
                    loading={deleteManyIsLoading}
                >
                    {translate("common:resources.posts.updateMany")}
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ""}
                </span>
            </div> */}
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column key="status" dataIndex="status" title="Status" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    key="category.id"
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
                    title="Actions"
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

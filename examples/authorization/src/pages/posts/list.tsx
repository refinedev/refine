import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    useMany,
    usePermissions,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { data: perssionsData } = usePermissions();

    return (
        <List {...props} canCreate={perssionsData?.includes("admin")}>
            <Table {...tableProps} key="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
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
                            {perssionsData?.includes("admin") && (
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            )}
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

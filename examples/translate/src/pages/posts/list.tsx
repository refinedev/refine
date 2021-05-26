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
    useTranslate,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const translate = useTranslate();
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    return (
        <List {...props} title={translate("resources:posts.titles.list")}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title={translate("resources:posts.fields.title")}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    key="category.id"
                    title={translate("resources:posts.fields.category")}
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
                    title={translate("resources:table.actions")}
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

import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
} from "@pankod/refine";

import { IPost, ICategory } from "../../interfaces"

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>({});

    const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>(
        "categories",
        categoryIds,
        {
            enabled: categoryIds.length > 0,
        },
    );

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => {
                        return (
                            <Space>
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};

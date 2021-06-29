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
    Form,
    Input,
    Button,
    DatePicker,
    CrudFilters,
    DateField,
} from "@pankod/refine";
import { Dayjs } from "dayjs";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable<
        IPost,
        { title: string; createdAt: [Dayjs, Dayjs] }
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { title, createdAt } = params;

            if (title) {
                filters.push({
                    field: "title",
                    operator: "contains",
                    value: title,
                });
            }

            if (createdAt) {
                filters.push(
                    {
                        field: "createdAt",
                        operator: "gte",
                        value: createdAt[0].toISOString(),
                    },
                    {
                        field: "createdAt",
                        operator: "lte",
                        value: createdAt[1].toISOString(),
                    },
                );
            }

            return filters;
        },
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { RangePicker } = DatePicker;

    return (
        <List>
            <Space direction="vertical" size="large">
                <Form layout="inline" {...searchFormProps}>
                    <Form.Item label="Title" name="title">
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item label="Created At" name="createdAt">
                        <RangePicker />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column
                        dataIndex="createdAt"
                        title="Created At"
                        render={(value) => (
                            <DateField format="LLL" value={value} />
                        )}
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
                                        data?.data.find(
                                            (item) => item.id === value,
                                        )?.title
                                    }
                                />
                            );
                        }}
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        render={(_value, record) => (
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
                        )}
                    />
                </Table>
            </Space>
        </List>
    );
};

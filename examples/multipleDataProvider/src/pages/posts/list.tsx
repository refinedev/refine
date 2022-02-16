import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    Space,
    EditButton,
    ShowButton,
    FilterDropdown,
    Select,
    Radio,
    TagField,
    getDefaultFilter,
    Collapse,
    useTable,
    useSelect,
    useSimpleList,
    AntdList,
    NumberField,
} from "@pankod/refine-antd";

import { IPost, ICategory, IProducts } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { Panel } = Collapse;

    const { tableProps, filters } = useTable<IPost>({
        syncWithLocation: true,
    });

    const { listProps } = useSimpleList<IProducts>({
        resource: "products",
        dataProviderName: "fineFoods",
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters, "in"),
    });

    const renderItem = (item: IProducts) => {
        const { name, price, description } = item;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <NumberField value={price} />
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={name} description={description} />
            </AntdList.Item>
        );
    };

    return (
        <List>
            <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
                <Panel header="Default Data Provider" key="1">
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="id" title="ID" />
                        <Table.Column dataIndex="title" title="Title" />
                        <Table.Column
                            dataIndex={["category", "id"]}
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
                            filterDropdown={(props) => (
                                <FilterDropdown
                                    {...props}
                                    mapValue={(selectedKeys) =>
                                        selectedKeys.map(Number)
                                    }
                                >
                                    <Select
                                        style={{ minWidth: 200 }}
                                        mode="multiple"
                                        placeholder="Select Category"
                                        {...categorySelectProps}
                                    />
                                </FilterDropdown>
                            )}
                            defaultFilteredValue={getDefaultFilter(
                                "category.id",
                                filters,
                                "in",
                            )}
                        />
                        <Table.Column
                            dataIndex="status"
                            title="Status"
                            render={(value: string) => (
                                <TagField value={value} />
                            )}
                            filterDropdown={(props: any) => (
                                <FilterDropdown {...props}>
                                    <Radio.Group>
                                        <Radio value="published">
                                            Published
                                        </Radio>
                                        <Radio value="draft">Draft</Radio>
                                        <Radio value="rejected">Rejected</Radio>
                                    </Radio.Group>
                                </FilterDropdown>
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
                                </Space>
                            )}
                        />
                    </Table>
                </Panel>
                <Panel header="Fine Foods Data Provider" key="2">
                    <div>
                        <AntdList {...listProps} renderItem={renderItem} />
                    </div>
                </Panel>
            </Collapse>
        </List>
    );
};

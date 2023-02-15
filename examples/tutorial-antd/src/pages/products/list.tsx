import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useMany,
} from "@pankod/refine-core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    MarkdownField,
    FilterDropdown,
    useSelect,
} from "@pankod/refine-antd";
import { Table, Space, Select } from "antd";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" sorter />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column dataIndex="material" title="Material" />
                <Table.Column
                    dataIndex="description"
                    title="Description"
                    render={(value: any) => (
                        <MarkdownField value={value.slice(0, 80) + "..."} />
                    )}
                />
                <Table.Column dataIndex="price" title="Price" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) =>
                        categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            categoryData?.data?.find(
                                (item) => item.id === value,
                            )?.title
                        )
                    }
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
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

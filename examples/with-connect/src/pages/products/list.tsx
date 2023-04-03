import { useEffect } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { List, EditButton, ShowButton, FilterDropdown } from "@refinedev/antd";
import { Table, Space, Input } from "antd";
import { useTable } from "@refinedev/antd";

import { useConnectMutation } from "@refinedev/connect";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { mutate, data, isLoading } = useConnectMutation<IProduct[]>();

    useEffect(() => {
        mutate({
            key: "postgresql-products",
        });
    }, []);

    const { tableProps } = useTable<IProduct>({
        syncWithLocation: true,
        hasPagination: false,
        queryOptions: {
            enabled: false,
        },
    });

    // override tableProps
    tableProps.dataSource = data;
    tableProps.loading = isLoading;
    tableProps.onChange = (_pagination, filters) => {
        if (Object.keys(filters).length > 0) {
            mutate({
                key: "postgresql-find-products",
                customParams: { ...filters },
            });
        }
    };

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column
                    dataIndex="name"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Product Name" />
                        </FilterDropdown>
                    )}
                    title="Title"
                />
                <Table.Column
                    dataIndex="price"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Price" />
                        </FilterDropdown>
                    )}
                    title="Price"
                />
                <Table.Column<IProduct>
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

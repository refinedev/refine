import { useEffect } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
} from "@pankod/refine-antd";
import { useTable } from "@pankod/refine-antd";

import { useCloudMutation } from "@pankod/refine-cloud";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { mutate, data, isLoading } = useCloudMutation<IProduct[]>();

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

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Title" />
                <Table.Column dataIndex="price" title="Price" />
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

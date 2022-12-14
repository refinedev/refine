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

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { mutate, data, isLoading } = useCloudMutation<ICategory[]>();

    useEffect(() => {
        mutate({
            key: "default-restapi-categories",
        });
    }, []);

    const { tableProps } = useTable<ICategory>({
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
            <Table
                {...tableProps}
                pagination={{
                    pageSize: 10,
                }}
                rowKey="id"
            >
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<ICategory>
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

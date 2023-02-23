import { GetListResponse } from "@pankod/refine-core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@pankod/refine-antd";
import { Table, Space } from "antd";
import type { IResourceComponentsProps } from "@pankod/refine-core";

import { IPost } from "../../interfaces";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = ({ initialData }) => {
    const { tableProps } = useTable<IPost>({
        queryOptions: {
            initialData,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
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
                                <DeleteButton
                                    hideText
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

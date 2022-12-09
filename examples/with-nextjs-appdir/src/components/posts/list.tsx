import { GetListResponse } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@pankod/refine-antd";
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
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
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

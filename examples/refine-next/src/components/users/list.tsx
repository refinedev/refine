import {
    useTable,
    List,
    Table,
    IResourceComponentsProps,
    GetListResponse,
} from "@pankod/refine";
import { IPost } from "src/interfaces";

export const UserList: React.FC<
    IResourceComponentsProps<{ users: GetListResponse<IPost> }>
> = ({ initialData }) => {
    const { tableProps } = useTable<IPost>({
        resource: "users",
        queryOptions: {
            initialData: initialData?.users,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Name" />
            </Table>
        </List>
    );
};

import { useTable, List, Table } from "@pankod/refine";
import { IPost } from "src/interfaces";

export const UserList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Name" />
            </Table>
        </List>
    );
};

import { GetServerSideProps } from "next";
import {
    useTable,
    List,
    Table,
    IResourceComponentsProps,
    GetListResponse,
    LayoutWrapper,
    EditButton,
} from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";

import { IPost } from "src/interfaces";

const API_URL = "https://api.fake-rest.refine.dev";

export const UserList: React.FC<{ users: GetListResponse<IPost> }> = ({
    users,
}) => {
    const { tableProps } = useTable<IPost>({
        resource: "users",
        queryOptions: {
            initialData: users,
        },
    });

    return (
        <LayoutWrapper>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="firstName" title="Name" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        render={(_text, record): React.ReactNode => {
                            return (
                                <EditButton
                                    size="small"
                                    resourceName="users"
                                    recordItemId={record.id}
                                    hideText
                                />
                            );
                        }}
                    />
                </Table>
            </List>
        </LayoutWrapper>
    );
};

export default UserList;

export async function getServerSideProps() {
    const data = await dataProvider(API_URL).getList("users", {});
    return {
        props: { users: data },
    };
}

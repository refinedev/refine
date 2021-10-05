import { GetServerSideProps } from "next";
import {
    useTable,
    List,
    Table,
    GetListResponse,
    LayoutWrapper,
    parseTableParams,
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
        syncWithLocation: true,
    });

    return (
        <LayoutWrapper>
            <List title="Users">
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" sorter />
                    <Table.Column dataIndex="firstName" title="Name" />
                </Table>
            </List>
        </LayoutWrapper>
    );
};

export default UserList;

import { authProvider } from "../../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let isAuthenticated = false;
    try {
        await authProvider.checkAuth(context);
        isAuthenticated = true;
    } catch (error) {}

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    /*  const { isAuthenticated, redirect } = checkAuthentication(authProvider, context);

    if (!isAuthenticated) {
        return { redirect };
    } */

    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(context.req.url || "");

    const data = await dataProvider(API_URL).getList({
        resource: "users",
        filters: parsedFilters,
        pagination: {
            current: parsedCurrent || 1,
            pageSize: parsedPageSize || 10,
        },
        sort: parsedSorter,
    });

    return {
        props: { users: data },
    };
};

import { GetServerSideProps } from "next";
import {
    GetListResponse,
    LayoutWrapper,
    parseTableParamsFromQuery,
} from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    getDefaultSortOrder,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import { checkAuthentication } from "@pankod/refine-nextjs-router";

import { IPost } from "src/interfaces";

import { API_URL } from "../../src/constants";

export const UserList: React.FC<{ users: GetListResponse<IPost> }> = ({
    users,
}) => {
    const { tableProps, sorter } = useTable<IPost>({
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
                    <Table.Column
                        dataIndex="id"
                        title="ID"
                        sorter={{
                            multiple: 1,
                        }}
                        defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    />
                    <Table.Column
                        dataIndex="firstName"
                        title="Name"
                        sorter={{ multiple: 2 }}
                        defaultSortOrder={getDefaultSortOrder(
                            "firstName",
                            sorter,
                        )}
                    />
                </Table>
            </List>
        </LayoutWrapper>
    );
};

export default UserList;

import { authProvider } from "../../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, ...props } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return props;
    }

    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParamsFromQuery(context.query);

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

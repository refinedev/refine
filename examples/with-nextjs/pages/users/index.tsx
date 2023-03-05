import { GetServerSideProps } from "next";
import {
    GetListResponse,
    LayoutWrapper,
    parseTableParamsFromQuery,
} from "@refinedev/core";
import { useTable, List, getDefaultSortOrder } from "@refinedev/antd";
import { Table } from "antd";
import dataProvider from "@refinedev/simple-rest";

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

import { checkAuthentication } from "src/utils/checkAuthentication";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, ...props } = await checkAuthentication(context);

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

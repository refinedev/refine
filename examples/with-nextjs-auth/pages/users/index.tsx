import { GetServerSideProps } from "next";
import { GetListResponse, parseTableParamsFromQuery } from "@refinedev/core";
import { useTable, List, getDefaultSortOrder, Layout } from "@refinedev/antd";
import { Table } from "antd";
import dataProvider from "@refinedev/simple-rest";

import { IUser } from "src/interfaces";
import { authProvider } from "src/authProvider";
import { API_URL } from "../../src/constants";

export const UserList: React.FC<{ initialData: GetListResponse<IUser> }> = ({
    initialData,
}) => {
    const { tableProps, sorters } = useTable<IUser>({
        resource: "users",
        queryOptions: {
            initialData,
        },
        syncWithLocation: true,
    });

    return (
        <Layout>
            <List title="Users">
                <Table {...tableProps} rowKey="id">
                    <Table.Column
                        dataIndex="id"
                        title="ID"
                        sorter={{
                            multiple: 1,
                        }}
                        defaultSortOrder={getDefaultSortOrder("id", sorters)}
                    />
                    <Table.Column
                        dataIndex="firstName"
                        title="Name"
                        sorter={{ multiple: 2 }}
                        defaultSortOrder={getDefaultSortOrder(
                            "firstName",
                            sorters,
                        )}
                    />
                </Table>
            </List>
        </Layout>
    );
};

export default UserList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: redirectTo,
                permanent: false,
            },
        };
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
        sorters: parsedSorter,
    });

    return {
        props: { initialData: data },
    };
};

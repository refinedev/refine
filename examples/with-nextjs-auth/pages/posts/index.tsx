import { GetServerSideProps } from "next";
import { GetListResponse, parseTableParamsFromQuery } from "@refinedev/core";
import {
    useTable,
    Layout,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { Table, Space } from "antd";

import { authProvider } from "src/authProvider";
import { IPost } from "src/interfaces";
import { API_URL } from "src/constants";

const PostList: React.FC<{ initialData: GetListResponse<IPost> }> = ({
    initialData,
}) => {
    const { tableProps } = useTable<IPost>({
        queryOptions: {
            initialData,
        },
    });

    return (
        <Layout>
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
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
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
        resource: "posts",
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

export default PostList;

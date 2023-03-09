import { parseTableParamsFromQuery } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    Layout,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import dataProvider from "@refinedev/simple-rest";

import { IPost } from "../interfaces";
import { API_URL } from "~/constants";
import { authProvider } from "~/authProvider";

const PostList: React.FC = () => {
    const { initialData } = useLoaderData<typeof loader>();

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
        </Layout>
    );
};

export default PostList;

export async function loader({ request }: LoaderArgs) {
    const { authenticated, redirectTo } = await authProvider.check(request);

    if (!authenticated) {
        throw redirect(redirectTo ?? "/login");
    }

    const url = new URL(request.url);
    const queryParams: any = {};
    url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParamsFromQuery(queryParams);

    const data = await dataProvider(API_URL).getList<IPost>({
        resource: "posts",
        filters: parsedFilters,
        pagination: {
            current: parsedCurrent || 1,
            pageSize: parsedPageSize || 10,
        },
        sorters: parsedSorter,
    });

    return json({ initialData: data });
}

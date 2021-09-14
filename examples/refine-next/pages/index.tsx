import React from "react";

import { Refine, Resource, useTable, Table } from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

const Home: React.FC = () => {
    return (
        <Refine {...routerProvider()} dataProvider={dataProvider(API_URL)}>
            <Resource name="posts" list={PostList} />
        </Refine>
    );
    // return null
};

export default Home;

const PostList = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
        </Table>
    );
};

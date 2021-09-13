import React from "react";

import { Refine, Resource, useTable, Table } from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const Home: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <Resource name="posts" list={PostList} />
        </Refine>
    );
    // return null
};

export default Home;

const PostList = () => {
    const { tableProps, filters } = useTable<IPost>();

    return (
        <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
        </Table>
    );
};

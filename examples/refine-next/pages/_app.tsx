import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

import { Refine, Resource, useTable, Table } from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            {...routerProvider()}
            dataProvider={dataProvider(API_URL)}
            resources={[{ name: "users", list: PostList }]}
        >
            <Component {...pageProps} />
            {/* <Resource name="posts" list={PostList} /> */}
            {/* <Resource name="posts" list={PostList} /> */}
            {/* <div>hdhdhd</div> */}
        </Refine>
    );
}

const PostList = () => {
    const { tableProps } = useTable<IPost>({ syncWithLocation: true });

    return (
        // <div>hello</div>
        <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column dataIndex="firstName" title="Name" />
        </Table>
    );
};

export default MyApp;

import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

import {
    Refine,
    Resource,
    List,
    useTable,
    Table,
    Create,
    useForm,
    Form,
    Input,
    Select,
    useSelect,
} from "@pankod/refine";
import "@pankod/refine/dist/styles.min.css";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            {...routerProvider()}
            dataProvider={dataProvider(API_URL)}
            resources={[
                { name: "users", list: UserList },
                { name: "posts", list: PostList, create: PostCreate },
            ]}
        >
            <Component {...pageProps} />
            {/* <Resource name="posts" list={PostList} /> */}
            {/* <Resource name="posts" list={PostList} /> */}
            {/* <div>hdhdhd</div> */}
        </Refine>
    );
}

const UserList = () => {
    const { tableProps } = useTable<IPost>(/* { syncWithLocation: true } */);

    return (
        <List>
            {/* <div>hello</div> */}
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Name" />
            </Table>
        </List>
    );
};

const PostList = () => {
    const { tableProps } = useTable<IPost>(/* { syncWithLocation: true } */);

    return (
        <List>
            {/* <div>hello</div> */}
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};

interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

export default MyApp;

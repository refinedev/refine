import React from "react";
import {
    DateField,
    List,
    Refine,
    Resource,
    Table,
    useMany,
    useTable,
} from "@pankod/refine";
import "@pankod/refine/dist/styles.min.css";

import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    return (
        <List>
            <Table<IPost> {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value: string) => {
                        if (isLoading) {
                            return "loading...";
                        }

                        return data?.data.find(
                            (item: ICategory) => item.id === value,
                        )?.title;
                    }}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
            </Table>
        </List>
    );
};

export default App;

interface IPost {
    title: string;
    slug: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    category: ICategory;
    user: {
        id: string;
    };
    tags: [{ id: string }];
}

interface ICategory {
    id: string;
    title: string;
}

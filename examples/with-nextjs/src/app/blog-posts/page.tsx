"use client";
import dataProvider from "@refinedev/simple-rest";
import { parseTableParams } from "@refinedev/nextjs-router/pages";

const API_URL = "https://api.fake-rest.refine.dev";

export default async function ProductList(props: any) {
    console.log(parseTableParams(props.searchParams));
    const { posts, total } = await getData();

    return (
        <div>
            <h1>Posts ({total})</h1>
            <hr />
            {posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

async function getData() {
    const response = await dataProvider(API_URL).getList({
        resource: "posts",
        filters: [{ field: "title", operator: "contains", value: "lorem" }],
    });

    return {
        posts: response.data,
        total: response.total,
    };
}

import React from "react";
import { useOne, useMany, BaseKey } from "@refinedev/core";

export const PostList: React.FC = () => {
    const { data: postData, isLoading: postLoading } = useOne<IPost>({
        resource: "posts",
        id: 123,
    });

    const { data: tagData, isLoading: tagLoading } = useMany<ITag>({
        resource: "tags",
        ids: postData?.data?.tags || [],
        queryOptions: {
            enabled: !!postData?.data?.tags?.length,
        },
    });

    const loading = postLoading || tagLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{postData?.data?.title}</h4>
            <p>Material: {postData?.data?.content}</p>
            <h4>Tags</h4>
            <ul>
                {tagData?.data?.map((tag) => (
                    <li key={tag.id}>{tag.title}</li>
                ))}
            </ul>
        </div>
    );
};

interface IPost {
    id: BaseKey;
    title: string;
    content: string;
    tags: BaseKey[];
}

interface ITag {
    id: BaseKey;
    title: string;
}

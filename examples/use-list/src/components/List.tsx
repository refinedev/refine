import { useList } from "@refinedev/core";
import type { GetListResponse } from "@refinedev/core";
import { useCallback, useState } from "react";

interface IPost {
  id: number;
  title: string;
}

export const List = () => {
  const [testState, setTestState] = useState(1);

  const select = useCallback(
    (data: GetListResponse<IPost>) => {
      setTestState(5);
      return data;
    },
    [setTestState],
  );

  const { result } = useList<IPost>({
    resource: "blog_posts",
    queryOptions: {
      select,
    },
  });

  const posts = result.data ?? [];

  return (
    <div style={{ padding: "16px" }}>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: IPost) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

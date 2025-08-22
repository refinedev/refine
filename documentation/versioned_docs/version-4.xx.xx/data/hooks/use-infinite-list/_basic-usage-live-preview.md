```tsx live url=http://localhost:3000/categories previewHeight=300px
import React from "react";
import { Refine } from "@refinedev/core";

setInitialRoutes(["/posts"]);
// visible-block-start
import React from "react";
import { useInfiniteList } from "@refinedev/core";

const PostList = () => {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteList({
    resource: "categories",
    pagination: {
      pageSize: 4,
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  const allPages = [].concat(...(data?.pages ?? []).map((page) => page.data));

  return (
    <div>
      <ul>
        {allPages.map(({ id, title }) => (
          <li key={id}>
            {id}.{title}
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};
// visible-block-end

setRefineProps({
  // Layout: (props: LayoutProps) => <Layout {...props} />,
  resources: [
    {
      name: "posts",
      list: "/posts",
    },
  ],
});

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo>
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

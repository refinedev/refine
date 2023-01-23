```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import {
    IResourceComponentsProps,
    useMany,
    useTable,
    HttpError,
} from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    category: {
        id: number;
    };
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
        setFilters,
        sorter,
        setSorter,
    } = useTable<IPost, HttpError>({
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
    });

    // Fetches the posts for the current page
    const posts = tableQueryResult?.data?.data ?? [];
    // Checks if there is a next page available
    const hasNext = current < pageCount;
    // Checks if there is a previous page available
    const hasPrev = current > 1;
    // Gets the current sort order for the "createdAt" column
    const currentDateSortOrder =
        sorter.find((item) => item.field === "createdAt")?.order || "desc";

    // This code displays the category of each post. It uses the useMany hook to fetch the category data from the API.
    // The posts array is used to create the array of ids for the useMany hook.
    // The queryOptions.enabled property is set to true only if the posts array is not empty.
    const { data: categoryData, isLoading: categoryIsLoading } = useMany<
        ICategory,
        HttpError
    >({
        resource: "categories",
        ids: posts.map((item) => item?.category?.id),
        queryOptions: {
            enabled: !!posts.length,
        },
    });

    const setSearchFilter = (value: string) => {
        setFilters([
            {
                field: "title",
                operator: "contains",
                value,
            },
        ]);
    };

    const toggleDateSort = () => {
        setSorter([
            {
                field: "createdAt",
                order: currentDateSortOrder === "asc" ? "desc" : "asc",
            },
        ]);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <input
                    placeholder="Search by title"
                    onChange={(e) => {
                        setSearchFilter(e.currentTarget.value);
                    }}
                />
                <button onClick={toggleDateSort}>
                    Sort date by{" "}
                    {currentDateSortOrder === "asc" ? "desc" : "asc"}
                </button>
            </div>
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{new Date(post.createdAt).toDateString()}</td>
                            <td>
                                {categoryIsLoading
                                    ? "loading..."
                                    : // This code gets the title of the category from the categoryData object, which is the result of the useMany hook.
                                      categoryData?.data.find(
                                          (item) =>
                                              item.id === post.category.id,
                                      )?.title || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <div>
                    <button onClick={() => setCurrent(1)} disabled={!hasPrev}>
                        First
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev - 1)}
                        disabled={!hasPrev}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev + 1)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => setCurrent(pageCount)}
                        disabled={!hasNext}
                    >
                        Last
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {current} of {pageCount}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={current + 1}
                        onChange={(e) => {
                            const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                            setCurrent(value);
                        }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        const value = e.target.value
                            ? Number(e.target.value)
                            : 10;
                        setPageSize(value);
                    }}
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

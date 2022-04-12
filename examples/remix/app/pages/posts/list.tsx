import { useNavigation, useTable } from "@pankod/refine-core";
import { useLoaderData } from "@remix-run/react";
export const PostList = function Index() {
    const { initialData } = useLoaderData();

    const { tableQueryResult } = useTable({
        queryOptions: {
            initialData: initialData,
        },
    });
    const { edit, create } = useNavigation();

    return (
        <div>
            <button onClick={() => create("posts")}>Create Post</button>
            <table>
                <thead>
                    <td>ID</td>
                    <td>Title</td>
                    <td>Actions</td>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

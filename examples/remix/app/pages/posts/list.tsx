import { useNavigation, useTable } from "@pankod/refine-core";
import { useLoaderData } from "@remix-run/react";
export const PostList = function Index() {
    const { initialData } = useLoaderData();

    console.log({ initialData });

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
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
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

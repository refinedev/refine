import { useTable, useNavigation, useModal } from "@pankod/refine-core";
import { useState } from "react";

import { History } from "../../components/history";
import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const { show, close, visible } = useModal();
    const [historyId, setHistoryId] = useState<string>();
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
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
                            <td>
                                <button onClick={() => edit("posts", post.id)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        // toggle modal
                                        if (visible && historyId === post.id) {
                                            return close();
                                        }

                                        setHistoryId(post.id);
                                        show();
                                    }}
                                >
                                    History
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visible && (
                <>
                    <h2>History</h2>
                    <History resource="posts" id={historyId} />
                </>
            )}
        </div>
    );
};

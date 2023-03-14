import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { CreatePost, EditPost } from "components";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const createModalFormReturnValues = useModalForm<IPost, HttpError, IPost>({
        refineCoreProps: { action: "create" },
    });
    const editModalFormReturnValues = useModalForm<IPost, HttpError, IPost>({
        refineCoreProps: { action: "edit" },
    });

    const {
        modal: { show: showCreateModal },
    } = createModalFormReturnValues;
    const {
        modal: { show: showEditModal },
    } = editModalFormReturnValues;

    return (
        <div>
            <CreatePost {...createModalFormReturnValues} />
            <EditPost {...editModalFormReturnValues} />
            <button onClick={() => showCreateModal()}>Create Post</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>
                                <button onClick={() => showEditModal(post.id)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

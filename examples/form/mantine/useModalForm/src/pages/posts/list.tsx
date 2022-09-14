import { useTable } from "@pankod/refine-core";
import {
    EditButton,
    List,
    Pagination,
    Table,
    useModalForm,
} from "@pankod/refine-mantine";

import { CreatePostModal, EditPostModal } from "../../components";
import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult, current, setCurrent, pageCount } =
        useTable<IPost>({
            resource: "posts",
        });

    const initialValues = {
        title: "",
        status: "",
        category: {
            id: "",
        },
        content: "",
    };

    const createModalForm = useModalForm({
        refineCoreProps: { action: "create" },
        initialValues,
    });
    const {
        modal: { show: showCreateModal },
    } = createModalForm;

    const editModalForm = useModalForm({
        refineCoreProps: { action: "edit" },
        initialValues,
    });
    const {
        modal: { show: showEditModal },
    } = editModalForm;

    return (
        <>
            <CreatePostModal {...createModalForm} />
            <EditPostModal {...editModalForm} />
            <List createButtonProps={{ onClick: () => showCreateModal() }}>
                <Table>
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
                                    <EditButton
                                        hideText
                                        size="xs"
                                        onClick={() => showEditModal(post.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br />
                <Pagination
                    position="right"
                    total={pageCount}
                    page={current}
                    onChange={setCurrent}
                />
            </List>
        </>
    );
};

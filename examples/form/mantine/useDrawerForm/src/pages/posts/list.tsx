import { useTable } from "@pankod/refine-core";
import {
    EditButton,
    List,
    Pagination,
    Table,
    useModalForm as useDrawerForm,
} from "@pankod/refine-mantine";

import { CreatePostDrawer, EditPostDrawer } from "../../components";
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

    const createDrawerForm = useDrawerForm({
        refineCoreProps: { action: "create" },
        initialValues,
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerForm;

    const editDrawerForm = useDrawerForm({
        refineCoreProps: { action: "edit" },
        initialValues,
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerForm;

    return (
        <>
            <CreatePostDrawer {...createDrawerForm} />
            <EditPostDrawer {...editDrawerForm} />
            <List createButtonProps={{ onClick: () => showCreateDrawer() }}>
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
                                        onClick={() => showEditDrawer(post.id)}
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

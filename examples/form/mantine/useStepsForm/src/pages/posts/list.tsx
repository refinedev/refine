import { useTable } from "@pankod/refine-core";
import { EditButton, List, Pagination, Table } from "@pankod/refine-mantine";

import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult, current, setCurrent, pageCount } =
        useTable<IPost>({
            resource: "posts",
        });

    return (
        <List>
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
                                    recordItemId={post.id}
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
    );
};

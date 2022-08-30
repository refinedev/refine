import { useMemo } from "react";
import { useNavigation, useRouterContext, useTable } from "@pankod/refine-core";
import {
    Anchor,
    Center,
    List,
    Pagination,
    Table,
} from "@pankod/refine-mantine";
import { Post } from "../../interfaces";

export const PostList = () => {
    const { showUrl: generateShowUrl } = useNavigation();

    const { Link } = useRouterContext();

    const { tableQueryResult, current, setCurrent, pageCount } = useTable<Post>(
        {
            resource: "posts",
        },
    );

    const rows = useMemo(() => {
        const data = tableQueryResult?.data?.data || [];

        return data.map((item) => (
            <tr key={item.id}>
                <td>
                    <Anchor
                        to={generateShowUrl("posts", item.id)}
                        component={Link}
                        variant="text"
                        underline
                    >
                        {item.id}
                    </Anchor>
                </td>
                <td>{item.title}</td>
                <td>{item.hit}</td>
                <td>{item.status}</td>
            </tr>
        ));
    }, [tableQueryResult.data]);

    return (
        <List>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Hit</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            <Center mt={16}>
                {pageCount && (
                    <Pagination
                        total={pageCount}
                        page={current}
                        onChange={setCurrent}
                    />
                )}
            </Center>
        </List>
    );
};

import { useTable, useNavigation } from "@refinedev/core";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
    ListItem,
    Button,
} from "react95";

import { ICategory } from "interfaces";
import { TopMenu } from "components/bar";

export const CategoryList = () => {
    const { tableQueryResult } = useTable<ICategory>({
        resource: "categories",
    });

    const { goBack, create, edit } = useNavigation();

    return (
        <>
            <div style={{ marginBottom: 48 }}>
                <TopMenu>
                    <ListItem
                        onClick={() => {
                            create("categories");
                        }}
                    >
                        Create Category
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            goBack();
                        }}
                    >
                        Back to Posts
                    </ListItem>
                </TopMenu>
            </div>
            <Window style={{ width: "100%" }}>
                <WindowHeader>Categories</WindowHeader>
                <WindowContent>
                    <Table>
                        <TableHead>
                            <TableRow head>
                                <TableHeadCell>ID</TableHeadCell>
                                <TableHeadCell>Title</TableHeadCell>
                                <TableHeadCell>Actions</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableQueryResult.data?.data.map((item) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableDataCell>{item.id}</TableDataCell>
                                        <TableDataCell>
                                            {item.title}
                                        </TableDataCell>
                                        <TableDataCell>
                                            <Button
                                                onClick={() => {
                                                    edit("categories", item.id);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </TableDataCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </WindowContent>
            </Window>
        </>
    );
};

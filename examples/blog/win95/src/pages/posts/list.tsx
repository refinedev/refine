/* eslint-disable react/jsx-key */
import { useMemo, useRef, useState } from "react";
import { useOne, useNavigation, useImport } from "@pankod/refine-core";
import {
    useTable,
    Column,
    useSortBy,
    usePagination,
    useFilters,
} from "@pankod/refine-react-table";

import { IPost, ICategory, ICsvPost } from "interfaces";
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
    Button,
    Select,
    NumberField,
    Progress,
    ListItem,
} from "react95";

import { TopMenu } from "components/bar";

export const PostList = () => {
    const csvInputRef = useRef<any>(null);
    const [total, setTotal] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [visible, setVisible] = useState(false);

    const { edit, create } = useNavigation();

    const { handleChange } = useImport<ICsvPost>({
        onFinish: (results) => {
            console.log(results);
            setTimeout(() => {
                setVisible(true);
            }, 3000);
        },
        onProgress: ({ totalAmount, processedAmount }) => {
            setTotal(totalAmount);
            setProcessed(processedAmount);
        },
    });

    const columns: Array<Column> = useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
            },
            {
                id: "category.id",
                Header: "Category",
                accessor: "category.id",
                Cell: ({ cell }) => {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: (cell.row.original as any).categoryId,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title ?? "Not Found";
                },
            },
            {
                id: "action",
                Header: "Action",
                accessor: "id",
                // eslint-disable-next-line react/display-name
                Cell: ({ value }) => (
                    <Button onClick={() => edit("posts", value)}>Edit</Button>
                ),
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        setPageSize,
        gotoPage,
        state: { pageIndex, pageSize },
    } = useTable<IPost>({ columns }, useFilters, useSortBy, usePagination);

    return (
        <>
            <div style={{ marginBottom: 48 }}>
                <TopMenu>
                    <ListItem
                        onClick={() => {
                            create("posts");
                        }}
                    >
                        Create Post
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            csvInputRef.current.click();
                        }}
                    >
                        Import CSV
                    </ListItem>
                </TopMenu>
                <input
                    style={{ display: "none" }}
                    type="file"
                    ref={csvInputRef}
                    onChange={(event) => {
                        if (event.target.files) {
                            handleChange({
                                file: event.target.files[0],
                            });
                        }
                    }}
                />
            </div>

            <div style={{ margin: 24 }}>
                {!visible && total !== 0 && (
                    <Progress value={Math.floor((processed / total) * 100)} />
                )}
            </div>

            <Window style={{ width: "100%" }}>
                <WindowHeader>Posts</WindowHeader>
                <WindowContent style={{ overflowX: "hidden" }}>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps()}
                                    style={{ overflowX: "auto" }}
                                >
                                    {headerGroup.headers.map((column) => (
                                        <TableHeadCell
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps(),
                                            )}
                                        >
                                            {column.render("Header")}
                                        </TableHeadCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <TableDataCell
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render("Cell")}
                                                </TableDataCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </WindowContent>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 8,
                        marginTop: 8,
                        alignItems: "flex-end",
                    }}
                >
                    <Select
                        style={{ marginLeft: 8 }}
                        value={pageSize}
                        onChange={(_: any, selection: any) => {
                            setPageSize(selection.value);
                        }}
                        options={opt}
                        defaultValue={"10"}
                    ></Select>
                    <span style={{ marginLeft: 8 }}>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                            Go to page:
                            <NumberField
                                style={{ marginLeft: 8 }}
                                min={1}
                                defaultValue={pageIndex + 1}
                                width={130}
                                onChange={(value: any) => {
                                    const page = value ? Number(value) - 1 : 0;
                                    gotoPage(page);
                                }}
                            />
                        </span>
                    </span>
                </div>
            </Window>
        </>
    );
};

export const opt = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
];

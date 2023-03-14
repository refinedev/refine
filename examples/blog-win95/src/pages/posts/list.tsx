import React, { useRef, useState } from "react";
import { useOne, useNavigation, useImport } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";

import { ColumnDef, flexRender } from "@tanstack/react-table";

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

export const PostList: React.FC = () => {
    // eslint-disable-next-line
    const csvInputRef = useRef<any>(null);
    const [total, setTotal] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [visible, setVisible] = useState(false);

    const { edit, create } = useNavigation();

    const { handleChange } = useImport<ICsvPost>({
        onFinish: () => {
            setTimeout(() => {
                setVisible(true);
            }, 3000);
        },
        onProgress: ({ totalAmount, processedAmount }) => {
            setTotal(totalAmount);
            setProcessed(processedAmount);
        },
    });

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "categoryId",
                header: "Category",
                accessorKey: "categoryId",
                cell: function render({ getValue }) {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: getValue() as number,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title ?? "Not Found";
                },
            },
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Button
                            onClick={() => edit("posts", getValue() as number)}
                        >
                            Edit
                        </Button>
                    );
                },
            },
        ],
        [],
    );

    const {
        options: { pageCount },
        getHeaderGroups,
        getRowModel,
        getState,
        setPageIndex,
        setPageSize,
    } = useTable<IPost>({ columns });

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
                    <Table>
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    style={{ overflowX: "auto" }}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHeadCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHeadCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableDataCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
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
                        value={getState().pagination.pageSize}
                        // eslint-disable-next-line
                        onChange={(_: any, selection: any) => {
                            setPageSize(selection.value);
                        }}
                        options={opt}
                        defaultValue={"10"}
                    ></Select>
                    <span style={{ marginLeft: 8 }}>
                        Page{" "}
                        <strong>
                            {getState().pagination.pageIndex + 1} of {pageCount}
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                            Go to page:
                            <NumberField
                                style={{ marginLeft: 8 }}
                                min={1}
                                defaultValue={
                                    getState().pagination.pageIndex + 1
                                }
                                width={130}
                                // eslint-disable-next-line
                                onChange={(value: any) => {
                                    const page = value ? Number(value) - 1 : 0;
                                    setPageIndex(page);
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

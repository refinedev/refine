/* eslint-disable react/jsx-key */
import React from "react";
import { useTable, Column } from "@pankod/refine-react-table";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(
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
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable<IPost>({ columns });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

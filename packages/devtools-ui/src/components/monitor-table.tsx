import React from "react";
import clsx from "clsx";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import { Activity } from "src/interfaces/activity";
import { ChevronDownIcon } from "./icons/chevron-down";

type Props = {
    table: Table<Activity>;
    columns: ColumnDef<Activity>[];
    selected: string | null;
    onSelect: (identifier: string | null) => void;
};

export const MonitorTable = ({ table, columns, selected, onSelect }: Props) => {
    return (
        <>
            <div
                className={clsx(
                    "re-overflow-auto",
                    "re-rounded-tl-lg",
                    "re-rounded-tr-lg",
                    "re-border",
                    "re-border-gray-700",
                )}
            >
                <table className={clsx("re-w-full", "re-rounded-lg")}>
                    <thead className={clsx("re-bg-gray-800", "re-rounded-lg")}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className={clsx(
                                    "re-border-b",
                                    "re-border-gray-700",
                                )}
                            >
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={clsx(
                                            "re-p-2",
                                            "re-text-gray-300",
                                            "re-text-xs",
                                            "re-font-semibold",
                                            "re-text-left",
                                        )}
                                        style={{
                                            minWidth:
                                                columns[header.index].minSize,
                                        }}
                                    >
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? "re-cursor-pointer re-select-none hover:re-underline re-flex re-items-center"
                                                        : "",
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: (
                                                    <ChevronDownIcon className="re-rotate-180" />
                                                ),
                                                desc: (
                                                    <ChevronDownIcon className="re-rotate-0" />
                                                ),
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            const isSelected =
                                row.original.identifier === selected;

                            return (
                                <tr
                                    key={row.original.identifier}
                                    className={clsx(
                                        isSelected && "re-bg-gray-800",
                                        !isSelected && "hover:re-bg-gray-800",
                                        !isSelected && "hover:re-bg-opacity-50",
                                        "re-border-b",
                                        "re-border-b-gray-700",
                                        "re-text-gray-300",
                                        "last-of-type:re-border-b-0",
                                        "re-text-xs",
                                        "re-cursor-pointer",
                                    )}
                                    onClick={() => {
                                        onSelect(
                                            selected === row.original.identifier
                                                ? null
                                                : row.original.identifier,
                                        );
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={clsx("re-p-2")}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div
                className={clsx(
                    "re-border",
                    "re-border-gray-700",
                    "re-border-t-0",
                    "re-rounded-bl-lg",
                    "re-rounded-br-lg",
                    "re-flex",
                    "re-items-center",
                    "re-justify-center",
                    "re-py-2",
                    "re-px-2",
                )}
            >
                <div
                    className={clsx(
                        "re-flex",
                        "re-items-center",
                        "re-justify-center",
                        "re-gap-2",
                        "re-flex-wrap",
                    )}
                >
                    <button
                        className={clsx(
                            "re-py-1",
                            "re-px-3",
                            "re-text-xs",
                            "hover:re-bg-gray-800",
                            "re-border",
                            "re-border-gray-700",
                            "re-text-gray-300",
                            "re-rounded-2xl",
                            "re-cursor-pointer",
                        )}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <span
                        className={clsx(
                            "re-flex",
                            "re-items-center",
                            "re-break-keep",
                            "re-whitespace-nowrap",
                            "re-text-gray-300",
                            "re-text-xs",
                        )}
                    >
                        {`${
                            table.getState().pagination.pageIndex + 1
                        } of ${table.getPageCount()}`}
                    </span>
                    <button
                        className={clsx(
                            "re-py-1",
                            "re-px-3",
                            "re-text-xs",
                            "hover:re-bg-gray-800",
                            "re-border",
                            "re-border-gray-700",
                            "re-text-gray-300",
                            "re-rounded-2xl",
                            "re-cursor-pointer",
                        )}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

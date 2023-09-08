import React from "react";
import clsx from "clsx";
import {
    DevToolsContext,
    DevtoolsEvent,
    receive,
} from "@refinedev/devtools-shared";
import {
    Cell,
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

import { Button } from "src/components/button";
import { FilterIcon } from "src/components/icons/filter";
import { ResizablePane } from "src/components/resizable-pane";
import { ChevronDownIcon } from "src/components/icons/chevron-down";
import { excludeKeys } from "src/utils/exclude-keys";
import type { Activity } from "src/interfaces/activity";
import { Status } from "src/components/status";
import { Owners } from "src/components/owners";
import { JsonViewer } from "src/components/json-viewer";

export const Monitor = () => {
    const { ws } = React.useContext(DevToolsContext);
    const [activities, setActivities] = React.useState<Activity[]>([]);

    const fetchActivities = React.useCallback(() => {
        fetch("/api/activities")
            .then((res) => res.json())
            .then((data) => {
                setActivities(data.data);
            });
    }, []);

    React.useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    React.useEffect(() => {
        if (!ws) return () => 0;

        const unsub = receive(
            ws,
            DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE,
            (payload) => {
                payload.updatedActivities.forEach((activity) => {
                    setActivities((activities) => {
                        const index = activities.findIndex(
                            (a) => a.identifier === activity.identifier,
                        );

                        if (index === -1) {
                            return [...activities, activity];
                        }

                        return [
                            ...activities.slice(0, index),
                            activity,
                            ...activities.slice(index + 1),
                        ];
                    });
                });
            },
        );

        return unsub;
    }, [ws]);

    const columns = React.useMemo(
        () =>
            [
                {
                    accessorFn: (activity) => activity.trace?.[0]?.function,
                    header: "Hook",
                },
                {
                    header: "Resource",
                    accessorFn: (activity) => {
                        const value = (activity.key as any)?.[1];
                        return value?.charAt(0).toUpperCase() + value?.slice(1);
                    },
                },
                // {
                //     header: "updateCount",
                //     accessorFn: (activity) => activity.state.dataUpdateCount,
                // },
                {
                    header: "Trace",
                    accessorFn: (activity) =>
                        activity.trace?.map((t) => t.function).reverse(),
                    cell: (cell: Cell<Activity, string[] | undefined>) => {
                        return (
                            <div className={clsx("re-flex", "trace-list")}>
                                {cell.getValue()?.map((t, i, arr) => (
                                    <div
                                        key={t}
                                        className={clsx(
                                            "trace-item",
                                            i > 0 && "-re-ml-px",
                                            i === 0 && "re-pl-2",
                                            i === arr.length - 1 && "re-pr-2",
                                            i === 0 && "re-rounded-l-xl",
                                            i === arr.length - 1 &&
                                                "re-rounded-r-xl",
                                            "re-border",
                                            "re-border-gray-700",
                                            "re-py-1",
                                            "re-px-1.5",
                                            "re-text-gray-300",
                                            "re-text-xs",
                                        )}
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        );
                    },
                },
                {
                    header: "Status",
                    accessorFn: (activity) => activity.status,
                    cell: (cell: Cell<Activity, Activity["status"]>) => (
                        <Status activity={cell.row.original} />
                    ),
                },
                // {
                //     header: "Fetch Status",
                //     accessorFn: (activity) => {
                //         console.log(activity);
                //         return activity.state.fetchStatus;
                //     },
                // },
                {
                    accessorKey: "type",
                    header: "Type",
                },
                {
                    accessorKey: "createdAt",
                    header: "Created At",
                    cell: (cell: Cell<Activity, Activity["createdAt"]>) => {
                        return dayjs(cell.getValue()).format("HH:mm:ss");
                    },
                },
            ] as ColumnDef<Activity>[],
        [],
    );

    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "createdAt",
            desc: true,
        },
    ]);

    const tableInstance = useReactTable({
        columns,
        data: activities,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const resetActivities = React.useCallback(() => {
        fetch("/api/activities/reset");
        setActivities([]);
    }, []);

    const [selectedActivity, setSelectedActivity] = React.useState<
        string | null
    >(null);

    const selectedActivityRecord = React.useMemo(
        () => activities.find((el) => el.identifier === selectedActivity),
        [activities, selectedActivity],
    );

    return (
        <div
            className={clsx("re-flex", "re-flex-col", "re-gap-4", "re-h-full")}
        >
            <div
                className={clsx(
                    "re-flex",
                    "re-items-center",
                    "re-justify-between",
                )}
            >
                <div
                    className={clsx(
                        "re-flex",
                        "re-items-center",
                        "re-justify-start",
                    )}
                >
                    <div
                        className={clsx(
                            "re-text-gray-0",
                            "re-font-semibold",
                            "re-text-sm",
                            "re-leading-6",
                        )}
                    >
                        Monitor
                    </div>
                    <Button
                        className={clsx(
                            "re-ml-4",
                            "!re-px-2",
                            "!re-py-1",
                            "re-flex",
                            "re-items-center",
                            "re-justify-center",
                            "re-gap-2",
                        )}
                        onClick={resetActivities}
                    >
                        <FilterIcon />
                        Filters
                    </Button>
                    <Button
                        className={clsx("re-ml-4", "!re-px-2", "!re-py-1")}
                        onClick={resetActivities}
                    >
                        Reset
                    </Button>
                </div>
                <div>
                    <div className={clsx("re-text-xs", "re-text-gray-300")}>
                        Count: {activities.length}
                    </div>
                </div>
            </div>
            <ResizablePane
                left={
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
                            <table
                                className={clsx("re-w-full", "re-rounded-lg")}
                            >
                                <thead
                                    className={clsx(
                                        "re-bg-gray-800",
                                        "re-rounded-lg",
                                    )}
                                >
                                    {tableInstance
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <tr
                                                key={headerGroup.id}
                                                className={clsx(
                                                    "re-border-b",
                                                    "re-border-gray-700",
                                                )}
                                            >
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <th
                                                            key={header.id}
                                                            className={clsx(
                                                                "re-p-2",
                                                                "re-text-gray-300",
                                                                "re-text-xs",
                                                                "re-font-semibold",
                                                                "re-min-w-[110px]",
                                                                "re-text-left",
                                                            )}
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
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
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
                                                    ),
                                                )}
                                            </tr>
                                        ))}
                                </thead>
                                <tbody>
                                    {tableInstance
                                        .getRowModel()
                                        .rows.map((row) => {
                                            const selected =
                                                row.original.identifier ===
                                                selectedActivity;

                                            return (
                                                <tr
                                                    key={
                                                        row.original.identifier
                                                    }
                                                    className={clsx(
                                                        selected &&
                                                            "re-bg-gray-800",
                                                        !selected &&
                                                            "hover:re-bg-gray-800",
                                                        !selected &&
                                                            "hover:re-bg-opacity-50",
                                                        "re-border-b",
                                                        "re-border-b-gray-700",
                                                        "re-text-gray-300",
                                                        "last-of-type:re-border-b-0",
                                                        "re-text-xs",
                                                    )}
                                                    onClick={() => {
                                                        setSelectedActivity(
                                                            row.original
                                                                .identifier,
                                                        );
                                                    }}
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map((cell) => (
                                                            <td
                                                                key={cell.id}
                                                                className={clsx(
                                                                    "re-p-2",
                                                                )}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
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
                                    onClick={() => tableInstance.previousPage()}
                                    disabled={
                                        !tableInstance.getCanPreviousPage()
                                    }
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
                                        tableInstance.getState().pagination
                                            .pageIndex + 1
                                    } of ${tableInstance.getPageCount()}`}
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
                                    onClick={() => tableInstance.nextPage()}
                                    disabled={!tableInstance.getCanNextPage()}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                }
                right={
                    <div
                        className={clsx(
                            "re-h-full",
                            "re-border",
                            "re-rounded-lg",
                            "re-border-gray-700",
                            "re-text-gray-300",
                            "re-relative",
                        )}
                    >
                        <div
                            className={clsx(
                                "re-absolute",
                                "re-w-full",
                                "re-h-full",
                                "re-overflow-auto",
                            )}
                        >
                            {selectedActivityRecord ? (
                                <>
                                    <div
                                        className={clsx(
                                            "re-px-2",
                                            "re-pt-2",
                                            "re-pb-4",
                                            "re-bg-gray-800",
                                            "re-flex",
                                            "re-flex-col",
                                            "re-gap-2",
                                            "re-rounded-tl-lg",
                                            "re-rounded-tr-lg",
                                            "re-border-b",
                                            "re-border-b-gray-700",
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                                "re-py-1",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-20",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Resource:
                                            </div>
                                            <div
                                                className={clsx(
                                                    "re-flex-1",
                                                    "re-capitalize",
                                                )}
                                            >
                                                {
                                                    selectedActivityRecord
                                                        ?.key?.[1] as any
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                                "re-py-1",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-20",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Hook name:
                                            </div>
                                            <div className={clsx("re-flex-1")}>
                                                {
                                                    selectedActivityRecord
                                                        ?.trace?.[0].function
                                                }
                                                {selectedActivityRecord.type ===
                                                    "query" && (
                                                    <span
                                                        className={clsx(
                                                            "re-ml-2",
                                                            "re-rounded-xl",
                                                            "re-py-0.5",
                                                            "re-px-1",
                                                            "re-text-[10px]",
                                                            "re-text-alt-blue",
                                                            "re-bg-alt-blue",
                                                            "re-bg-opacity-20",
                                                            "re-border",
                                                            "re-border-alt-blue",
                                                        )}
                                                    >
                                                        Query
                                                    </span>
                                                )}
                                                {selectedActivityRecord.type ===
                                                    "mutation" && (
                                                    <span
                                                        className={clsx(
                                                            "re-ml-2",
                                                            "re-rounded-xl",
                                                            "re-py-0.5",
                                                            "re-px-1",
                                                            "re-text-[10px]",
                                                            "re-text-alt-cyan",
                                                            "re-bg-alt-cyan",
                                                            "re-bg-opacity-20",
                                                            "re-border",
                                                            "re-border-alt-cyan",
                                                        )}
                                                    >
                                                        Mutation
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-[72px]",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Trace:
                                            </div>
                                            <div
                                                className={clsx(
                                                    "re-flex-1",
                                                    "no-scrollbar",
                                                    "re-overflow-auto",
                                                )}
                                            >
                                                <div
                                                    className={clsx(
                                                        "re-flex",
                                                        "trace-list",
                                                    )}
                                                >
                                                    {selectedActivityRecord.trace
                                                        ?.reverse()
                                                        .map((t, i, arr) => (
                                                            <div
                                                                key={`${t}-${i}`}
                                                                className={clsx(
                                                                    "trace-item",
                                                                    i > 0 &&
                                                                        "-re-ml-px",
                                                                    i === 0 &&
                                                                        "re-pl-2",
                                                                    i ===
                                                                        arr.length -
                                                                            1 &&
                                                                        "re-pr-2",
                                                                    i === 0 &&
                                                                        "re-rounded-l-xl",
                                                                    i ===
                                                                        arr.length -
                                                                            1 &&
                                                                        "re-rounded-r-xl",
                                                                    "re-border",
                                                                    "re-border-gray-700",
                                                                    "re-py-1",
                                                                    "re-px-1.5",
                                                                    "re-text-gray-300",
                                                                    "re-text-xs",
                                                                )}
                                                            >
                                                                {t.function}
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(
                                            "re-flex",
                                            "re-flex-col",
                                            "re-py-4",
                                            "re-px-2",
                                            "re-border-b",
                                            "re-border-b-gray-700",
                                            "re-text-xs",
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                                "re-py-1",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-20",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Status:
                                            </div>
                                            <div
                                                className={clsx(
                                                    "re-flex-1",
                                                    "re-capitalize",
                                                )}
                                            >
                                                <Status
                                                    activity={
                                                        selectedActivityRecord
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                                "re-py-1",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-20",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Created At:
                                            </div>
                                            <div
                                                className={clsx(
                                                    "re-flex-1",
                                                    "re-capitalize",
                                                )}
                                            >
                                                {dayjs(
                                                    selectedActivityRecord.createdAt,
                                                ).format("HH:mm:ss:SSS")}
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "re-flex",
                                                "re-items-center",
                                                "re-justify-start",
                                                "re-w-full",
                                                "re-text-xs",
                                                "re-py-1",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-w-20",
                                                    "re-flex-shrink-0",
                                                    "re-text-gray-400",
                                                )}
                                            >
                                                Updated At:
                                            </div>
                                            <div
                                                className={clsx(
                                                    "re-flex-1",
                                                    "re-capitalize",
                                                )}
                                            >
                                                {dayjs(
                                                    selectedActivityRecord.updatedAt,
                                                ).format("HH:mm:ss:SSS")}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(
                                            "re-flex",
                                            "re-flex-col",
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                "re-px-2",
                                                "re-py-4",
                                                "re-flex",
                                                "re-flex-col",
                                                "re-gap-2",
                                                "re-border-b",
                                                "re-border-b-gray-700",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-text-xs",
                                                    "re-font-semibold",
                                                    "re-text-gray-300",
                                                )}
                                            >
                                                Owner(s)
                                            </div>
                                            <Owners
                                                activity={
                                                    selectedActivityRecord
                                                }
                                            />
                                        </div>
                                        <div
                                            className={clsx(
                                                "re-px-2",
                                                "re-py-4",
                                                "re-flex",
                                                "re-flex-col",
                                                "re-gap-2",
                                                "re-border-b",
                                                "re-border-b-gray-700",
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "re-text-xs",
                                                    "re-font-semibold",
                                                    "re-text-gray-300",
                                                )}
                                            >
                                                Key
                                            </div>
                                            <JsonViewer
                                                data={
                                                    selectedActivityRecord.key ??
                                                    []
                                                }
                                            />
                                        </div>
                                        {selectedActivityRecord.state.data && (
                                            <div
                                                className={clsx(
                                                    "re-px-2",
                                                    "re-py-4",
                                                    "re-flex",
                                                    "re-flex-col",
                                                    "re-gap-2",
                                                    "re-border-b",
                                                    "re-border-b-gray-700",
                                                )}
                                            >
                                                <div
                                                    className={clsx(
                                                        "re-text-xs",
                                                        "re-font-semibold",
                                                        "re-text-gray-300",
                                                    )}
                                                >
                                                    Data
                                                </div>
                                                <JsonViewer
                                                    data={
                                                        selectedActivityRecord
                                                            .state.data ?? {}
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedActivityRecord.state.error && (
                                            <div
                                                className={clsx(
                                                    "re-px-2",
                                                    "re-py-4",
                                                    "re-flex",
                                                    "re-flex-col",
                                                    "re-gap-2",
                                                    "re-border-b",
                                                    "re-border-b-gray-700",
                                                )}
                                            >
                                                <div
                                                    className={clsx(
                                                        "re-text-xs",
                                                        "re-font-semibold",
                                                        "re-text-gray-300",
                                                    )}
                                                >
                                                    Error
                                                </div>
                                                <JsonViewer
                                                    data={
                                                        selectedActivityRecord
                                                            .state.error ?? {}
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedActivityRecord.state && (
                                            <div
                                                className={clsx(
                                                    "re-px-2",
                                                    "re-py-4",
                                                    "re-flex",
                                                    "re-flex-col",
                                                    "re-gap-2",
                                                    "re-border-b",
                                                    "re-border-b-gray-700",
                                                )}
                                            >
                                                <div
                                                    className={clsx(
                                                        "re-text-xs",
                                                        "re-font-semibold",
                                                        "re-text-gray-300",
                                                    )}
                                                >
                                                    Extra
                                                </div>
                                                <JsonViewer
                                                    data={excludeKeys(
                                                        selectedActivityRecord.state,
                                                        [
                                                            "data",
                                                            "error",
                                                            "status",
                                                        ],
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div
                                    className={clsx(
                                        "re-w-full",
                                        "re-h-full",
                                        "re-flex",
                                        "re-justify-center",
                                        "re-items-center",
                                        "re-text-gray-600",
                                    )}
                                >
                                    No activity selected
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
};

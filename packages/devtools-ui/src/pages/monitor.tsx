import React from "react";
import clsx from "clsx";
import {
    DevToolsContext,
    DevtoolsEvent,
    DevtoolsEventPayloads,
    receive,
} from "@refinedev/devtools-shared";
import {
    Cell,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "src/components/button";
import { FilterIcon } from "src/components/icons/filter";

type Activity = DevtoolsEventPayloads[DevtoolsEvent.ACTIVITY];

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
                    cell: (cell: Cell<Activity, Activity["status"]>) => {
                        const status = cell.getValue();
                        const dataUpdateCount =
                            cell.row.original.type === "query"
                                ? cell.row.original.state.dataUpdateCount
                                : 0;
                        const fetchStatus =
                            cell.row.original.type === "query"
                                ? cell.row.original.state.fetchStatus
                                : "idle";

                        let state: typeof status | "initial" | "refetching" =
                            status;

                        if (status === "loading" && dataUpdateCount === 0) {
                            state = "initial";
                        }
                        if (
                            (status === "success" || status === "error") &&
                            fetchStatus === "fetching"
                        ) {
                            state = "refetching";
                        }

                        switch (state) {
                            case "initial":
                            case "idle":
                                return (
                                    <span className="re-text-gray-500 re-capitalize">
                                        {state}
                                    </span>
                                );
                            case "loading":
                            case "refetching":
                                return (
                                    <span className="re-text-alt-yellow re-capitalize">
                                        {state}
                                    </span>
                                );
                            case "error":
                                return (
                                    <span className="re-text-alt-red re-capitalize">
                                        {state}
                                    </span>
                                );
                            case "success":
                                return (
                                    <span className="re-text-alt-green re-capitalize">
                                        {state}
                                    </span>
                                );
                            default:
                                return <span>{state}</span>;
                        }
                    },
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
            ] as ColumnDef<Activity>[],
        [],
    );

    const tableInstance = useReactTable({
        columns,
        data: activities,
        getCoreRowModel: getCoreRowModel(),
    });

    const resetActivities = React.useCallback(() => {
        fetch("/api/activities/reset");
        setActivities([]);
    }, []);

    return (
        <div className={clsx("re-flex", "re-flex-col", "re-gap-4")}>
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
                <div
                    className={clsx(
                        "re-overflow-auto",
                        "re-rounded-lg",
                        "re-border",
                        "re-border-gray-700",
                    )}
                >
                    <table className={clsx("re-w-full", "re-rounded-lg")}>
                        <thead
                            className={clsx("re-bg-gray-800", "re-rounded-lg")}
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
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className={clsx(
                                                    "re-p-2",
                                                    "re-text-gray-300",
                                                    "re-text-xs",
                                                    "re-font-semibold",
                                                    "re-min-w-[100px]",
                                                    "re-text-left",
                                                )}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                        </thead>
                        <tbody>
                            {tableInstance.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.original.identifier}
                                    className={clsx(
                                        "hover:re-bg-gray-800",
                                        "re-border-b",
                                        "re-border-b-gray-700",
                                        "re-text-gray-300",
                                        "re-text-xs",
                                    )}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>{activities.length}</div>
        </div>
    );
};

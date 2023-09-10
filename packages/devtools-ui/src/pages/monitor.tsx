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
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

import { Button } from "src/components/button";
import { FilterIcon } from "src/components/icons/filter";
import { ResizablePane } from "src/components/resizable-pane";
import type { Activity } from "src/interfaces/activity";
import { Status } from "src/components/status";
import { MonitorDetails } from "src/components/monitor-details";
import { TraceList } from "src/components/trace-list";
import { MonitorTable } from "src/components/monitor-table";

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
                    header: "Hook",
                    minSize: 90,
                    accessorFn: (activity) => activity.trace?.[0]?.function,
                },
                {
                    header: "Resource",
                    minSize: 100,
                    accessorFn: (activity) => {
                        const value = (activity.key as any)?.[1];
                        return value?.charAt(0).toUpperCase() + value?.slice(1);
                    },
                },
                {
                    header: "Status",
                    minSize: 90,
                    accessorFn: (activity) => activity.status,
                    cell: (cell: Cell<Activity, Activity["status"]>) => (
                        <Status activity={cell.row.original} />
                    ),
                },
                {
                    header: "Trace",
                    minSize: 280,
                    accessorFn: (activity) =>
                        [
                            ...(activity.trace?.map((t) => t.function) ?? []),
                        ].reverse(),
                    cell: (cell: Cell<Activity, string[] | undefined>) => {
                        return <TraceList trace={cell.row.original.trace} />;
                    },
                },
                {
                    header: "Created At",
                    minSize: 100,
                    accessorKey: "createdAt",
                    cell: (cell: Cell<Activity, Activity["createdAt"]>) => {
                        return dayjs(cell.getValue()).format("HH:mm:ss");
                    },
                },
                {
                    header: "Updated At",
                    minSize: 100,
                    accessorKey: "updatedAt",
                    cell: (cell: Cell<Activity, Activity["updatedAt"]>) => {
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
                            "!re-py-2",
                            "re-flex",
                            "re-items-center",
                            "re-justify-center",
                            "re-gap-2",
                            "re-bg-alt-blue",
                            "re-bg-opacity-[0.15]",
                            "!re-text-alt-blue",
                        )}
                    >
                        <FilterIcon />
                        <span className="re-text-alt-blue">Filters</span>
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
                    <MonitorTable
                        table={tableInstance}
                        columns={columns}
                        onSelect={setSelectedActivity}
                        selected={selectedActivity}
                    />
                }
                right={<MonitorDetails activity={selectedActivityRecord} />}
            />
        </div>
    );
};

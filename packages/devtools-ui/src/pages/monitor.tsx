import React from "react";
import clsx from "clsx";
import {
    DevToolsContext,
    DevtoolsEvent,
    receive,
    hooksByScope,
    RefineHook,
    Scopes,
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

import { ResizablePane } from "src/components/resizable-pane";
import type { Activity } from "src/interfaces/activity";
import { Status } from "src/components/status";
import { MonitorDetails } from "src/components/monitor-details";
import { TraceList } from "src/components/trace-list";
import { MonitorTable } from "src/components/monitor-table";
import { Filters, MonitorFilters } from "src/components/monitor-filters";

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
                        if (typeof value === "string") {
                            return (
                                value?.charAt?.(0).toUpperCase() +
                                value?.slice?.(1)
                            );
                        } else {
                            return "";
                        }
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

    const [filters, setFilters] = React.useState<Filters>({
        hook: [],
        parent: undefined,
        resource: undefined,
        scope: ["data"],
        status: [],
    });

    const data = React.useMemo(() => {
        let filtered = [...activities];

        if (filters.scope && filters.scope.length > 0) {
            const allowedHooks: RefineHook[] = [];
            filters.scope.forEach((scope) => {
                allowedHooks.push(...hooksByScope[scope as Scopes]);
            });

            filtered = filtered.filter((activity) =>
                allowedHooks.includes(activity.hookName as RefineHook),
            );
        }
        if (filters.hook && filters.hook.length > 0) {
            filtered = filtered.filter((activity) =>
                filters.hook.includes(activity.hookName),
            );
        }
        if (filters.parent) {
            filtered = filtered.filter((activity) => {
                const regex = new RegExp(
                    (filters.parent ?? "")
                        .split(/[, ]+/)
                        .map((s) => `(${s.toLowerCase().trim()})`)
                        .join(".*"),
                    "i",
                );

                return activity.trace
                    ?.map((t) => t.function?.toLowerCase())
                    .reverse()
                    .join(",")
                    .match(regex);
            });
        }
        if (filters.resource) {
            //
        }

        if (filters.status && filters.status.length > 0) {
            filtered = filtered.filter((activity) =>
                filters.status.includes(activity.status as any),
            );
        }

        return filtered;
    }, [activities, filters]);

    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "createdAt",
            desc: true,
        },
    ]);

    const tableInstance = useReactTable({
        columns,
        data,
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
                    <MonitorFilters
                        filters={filters}
                        onSubmit={(f) => setFilters(f)}
                    />
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

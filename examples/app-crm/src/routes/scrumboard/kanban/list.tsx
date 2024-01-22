import { FC, PropsWithChildren, useMemo } from "react";

import {
    HttpError,
    useDelete,
    useList,
    useNavigation,
    useUpdate,
    useUpdateMany,
} from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DragEndEvent } from "@dnd-kit/core";
import { MenuProps } from "antd";

import { TaskUpdateInput } from "@/graphql/schema.types";
import { KanbanTasksQuery, KanbanTaskStagesQuery } from "@/graphql/types";

import {
    KanbanAddCardButton,
    KanbanAddStageButton,
    KanbanBoard,
    KanbanBoardSkeleton,
    KanbanColumn,
    KanbanColumnSkeleton,
    KanbanItem,
    ProjectCardMemo,
    ProjectCardSkeleton,
} from "../components";
import { KANBAN_TASK_STAGES_QUERY, KANBAN_TASKS_QUERY } from "./queries";

type Task = GetFieldsFromList<KanbanTasksQuery>;

type TaskStage = GetFieldsFromList<KanbanTaskStagesQuery>;

type TaskStageColumn = TaskStage & {
    tasks: Task[];
};

export const KanbanPage: FC<PropsWithChildren> = ({ children }) => {
    const { create, edit, replace } = useNavigation();

    const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
        resource: "taskStages",
        pagination: {
            mode: "off",
        },
        sorters: [
            {
                field: "createdAt",
                order: "asc",
            },
        ],
        meta: {
            gqlQuery: KANBAN_TASK_STAGES_QUERY,
        },
    });

    const { data: tasks, isLoading: isLoadingTasks } = useList<Task>({
        resource: "tasks",
        sorters: [
            {
                field: "dueDate",
                order: "asc",
            },
        ],
        queryOptions: {
            enabled: !!stages,
        },
        pagination: {
            mode: "off",
        },
        meta: {
            gqlQuery: KANBAN_TASKS_QUERY,
        },
    });

    // its convert Task[] to TaskStage[] (group by stage) for kanban
    // uses `stages` and `tasks` from useList hooks
    const taskStages = useMemo(() => {
        if (!tasks?.data || !stages?.data)
            return {
                unassignedStage: [],
                stages: [],
            };

        const unassignedStage = tasks.data.filter(
            (task) => task.stageId === null,
        );

        // prepare unassigned stage
        const grouped = stages.data.map((stage) => ({
            ...stage,
            tasks: tasks.data.filter(
                (task) => task.stageId?.toString() === stage.id,
            ),
        }));

        return {
            unassignedStage,
            stages: grouped,
        };
    }, [tasks, stages]);

    const { mutate: updateTask } = useUpdate<
        Task,
        HttpError,
        TaskUpdateInput
    >();
    const { mutate: updateManyTask } = useUpdateMany();
    const { mutate: deleteStage } = useDelete();

    const handleOnDragEnd = (event: DragEndEvent) => {
        let stageId = event.over?.id as undefined | string | null;
        const taskId = event.active.id as string;
        const taskStageId = event.active.data.current?.stageId;

        if (taskStageId === stageId) {
            return;
        }

        if (stageId === "unassigned") {
            stageId = null;
        }

        updateTask({
            resource: "tasks",
            id: taskId,
            values: {
                stageId: stageId,
            },
            successNotification: false,
            mutationMode: "optimistic",
        });
    };

    const handleAddStage = () => {
        create("taskStages", "replace");
    };

    const handleEditStage = (args: { stageId: string }) => {
        edit("taskStages", args.stageId);
    };

    const handleDeleteStage = (args: { stageId: string }) => {
        deleteStage({
            resource: "taskStage",
            id: args.stageId,
            successNotification: () => ({
                key: "delete-stage",
                type: "success",
                message: "Successfully deleted stage",
                description: "Successful",
            }),
        });
    };

    const handleAddCard = (args: { stageId: string }) => {
        const path =
            args.stageId === "unassigned"
                ? "create"
                : `create?stageId=${args.stageId}`;

        replace(path);
    };

    const handleClearCards = (args: { taskIds: string[] }) => {
        updateManyTask({
            resource: "tasks",
            ids: args.taskIds,
            values: {
                stageId: null,
            },
            successNotification: false,
        });
    };

    const getContextMenuItems = (column: TaskStageColumn) => {
        const hasItems = column.tasks.length > 0;

        const items: MenuProps["items"] = [
            {
                label: "Edit status",
                key: "1",
                icon: <EditOutlined />,
                onClick: () => handleEditStage({ stageId: column.id }),
            },
            {
                label: "Clear all cards",
                key: "2",
                icon: <ClearOutlined />,
                disabled: !hasItems,
                onClick: () =>
                    handleClearCards({
                        taskIds: column.tasks.map((task) => task.id),
                    }),
            },
            {
                danger: true,
                label: "Delete status",
                key: "3",
                icon: <DeleteOutlined />,
                disabled: hasItems,
                onClick: () => handleDeleteStage({ stageId: column.id }),
            },
        ];

        return items;
    };

    const isLoading = isLoadingTasks || isLoadingStages;

    if (isLoading) return <PageSkeleton />;

    return (
        <>
            <KanbanBoard onDragEnd={handleOnDragEnd}>
                <KanbanColumn
                    id={"unassigned"}
                    title={"unassigned"}
                    count={taskStages?.unassignedStage?.length || 0}
                    onAddClick={() => handleAddCard({ stageId: "unassigned" })}
                >
                    {taskStages.unassignedStage?.map((task) => {
                        return (
                            <KanbanItem
                                key={task.id}
                                id={task.id}
                                data={{ ...task, stageId: "unassigned" }}
                            >
                                <ProjectCardMemo {...task} />
                            </KanbanItem>
                        );
                    })}
                    {!taskStages.unassignedStage?.length && (
                        <KanbanAddCardButton
                            onClick={() =>
                                handleAddCard({ stageId: "unassigned" })
                            }
                        />
                    )}
                </KanbanColumn>
                {taskStages.stages?.map((column) => {
                    const contextMenuItems = getContextMenuItems(column);

                    return (
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            count={column.tasks.length}
                            contextMenuItems={contextMenuItems}
                            onAddClick={() =>
                                handleAddCard({ stageId: column.id })
                            }
                        >
                            {isLoading && <ProjectCardSkeleton />}
                            {!isLoading &&
                                column.tasks.map((task) => {
                                    return (
                                        <KanbanItem
                                            key={task.id}
                                            id={task.id}
                                            data={{
                                                ...task,
                                                stageId: column.id,
                                            }}
                                        >
                                            <ProjectCardMemo {...task} />
                                        </KanbanItem>
                                    );
                                })}
                            {!column.tasks.length && (
                                <KanbanAddCardButton
                                    onClick={() =>
                                        handleAddCard({ stageId: column.id })
                                    }
                                />
                            )}
                        </KanbanColumn>
                    );
                })}
                <KanbanAddStageButton onClick={handleAddStage} />
            </KanbanBoard>
            {children}
        </>
    );
};

const PageSkeleton = () => {
    const columnCount = 6;
    const itemCount = 4;

    return (
        <KanbanBoardSkeleton>
            {Array.from({ length: columnCount }).map((_, index) => {
                return (
                    <KanbanColumnSkeleton key={index} type="project">
                        {Array.from({ length: itemCount }).map((_, index) => {
                            return <ProjectCardSkeleton key={index} />;
                        })}
                    </KanbanColumnSkeleton>
                );
            })}
        </KanbanBoardSkeleton>
    );
};

import { FC, PropsWithChildren, useMemo } from "react";

import { HttpError, useList, useNavigation, useUpdate } from "@refinedev/core";

import { DragEndEvent } from "@dnd-kit/core";

import { Task, TaskStage, TaskUpdateInput } from "@/interfaces";

import {
    KanbanAddCardButton,
    KanbanBoard,
    KanbanBoardSkeleton,
    KanbanColumn,
    KanbanColumnSkeleton,
    KanbanItem,
    ProjectCardMemo,
    ProjectCardSkeleton,
} from "..";

const taskFragment = [
    "id",
    "title",
    "description",
    "dueDate",
    "completed",
    "stageId",
    {
        users: ["id", "name", "avatarUrl"],
    },
];

export const ProjectKanbanList: FC<PropsWithChildren> = ({ children }) => {
    const { replace } = useNavigation();

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
            fields: ["id", "title"],
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
            fields: taskFragment,
        },
    });

    // group tasks by stage
    // it's convert Task[] to TaskStage[] (group by stage) for kanban
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
        const grouped: TaskStage[] = stages.data.map((stage) => ({
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

    const handleAddCard = (args: { stageId: string }) => {
        const path =
            args.stageId === "unassigned"
                ? "/kanban/create"
                : `/kanban/create?stageId=${args.stageId}`;

        replace(path);
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
                    return (
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            count={column.tasks.length}
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

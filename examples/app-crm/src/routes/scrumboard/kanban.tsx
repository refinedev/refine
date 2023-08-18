import {
    HttpError,
    useCreate,
    useDelete,
    useList,
    useUpdate,
    useUpdateMany,
} from "@refinedev/core";
import { DragEndEvent } from "@dnd-kit/core";
import { DeleteOutlined, EditOutlined, ClearOutlined } from "@ant-design/icons";
import {
    KanbanBoard,
    KanbanColumnMemo,
    KanbanItem,
    KanbanAddStageButton,
    KanbanAddCardButton,
} from "../../components/kanban";
import { FullScreenLoading, ProjectCardMemo } from "../../components";
import { Task, TaskStage, TaskUpdateInput } from "../../interfaces/graphql";
import { MenuProps } from "antd";

const taskFragment = [
    "id",
    "title",
    "description",
    "dueDate",
    "completed",
    {
        checklist: ["title", "checked"],
    },
    {
        users: ["id", "name"],
    },
    {
        comments: ["totalCount"],
    },
];

export const KanbanPage = () => {
    const { data: unassignedStage, isLoading: isLoadingUnassignedStage } =
        useList<Task>({
            resource: "stages",
            pagination: {
                mode: "off",
            },
            filters: [
                {
                    field: "stage.id",
                    operator: "null",
                    value: null,
                },
            ],
            meta: {
                operation: "tasks",
                fields: taskFragment,
            },
        });

    const { data: taskStages, isLoading: isLoadingTaskStages } =
        useList<TaskStage>({
            resource: "stages",
            pagination: {
                mode: "off",
            },
            meta: {
                operation: "taskStages",
                fields: [
                    "id",
                    "title",
                    {
                        tasks: taskFragment,
                    },
                ],
            },
        });

    const { mutate: updateTask } = useUpdate<
        Task,
        HttpError,
        TaskUpdateInput
    >();
    const { mutate: updateManyTask } = useUpdateMany();
    const { mutate: createStage } = useCreate();
    const { mutate: deleteStage } = useDelete();

    const handleOnDragEnd = (event: DragEndEvent) => {
        const taskId = event.active.id as string;
        let stageId = event.over?.id as undefined | string | null;

        if (stageId === "unassigned") {
            stageId = null;
        }

        updateTask({
            resource: "stages",
            meta: {
                operation: "task",
            },
            id: taskId,
            values: {
                stageId: stageId,
            },
            successNotification: false,
        });
    };

    const handleAddStage = () => {
        const title = prompt("Enter stage title");
        createStage({
            resource: "stages",
            meta: {
                operation: "taskStage",
            },
            values: {
                title,
            },
        });
    };

    const handleEditStage = (args: { stageId: string }) => {
        alert("not implemented [stageId]: " + args.stageId);
    };

    const handleDeleteStage = (args: { stageId: string }) => {
        deleteStage({
            resource: "stages",
            meta: {
                operation: "taskStage",
            },
            id: args.stageId,
        });
    };

    const handleAddCard = (args: { stageId: string }) => {
        alert("not implemented [stageId]: " + args.stageId);
    };

    const handleClearCards = (args: { taskIds: string[] }) => {
        updateManyTask({
            resource: "stages",
            meta: {
                operation: "tasks",
            },
            ids: args.taskIds,
            values: {
                stageId: null,
            },
            successNotification: false,
        });
    };

    const getContextMenuItems = ({ column }: { column: TaskStage }) => {
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

    const loading = isLoadingUnassignedStage || isLoadingTaskStages;

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <KanbanBoard onDragEnd={handleOnDragEnd}>
            <KanbanColumnMemo
                id={"unassigned"}
                title={"unassigned"}
                count={unassignedStage?.data?.length || 0}
                onAddClick={() => handleAddCard({ stageId: "unassigned" })}
            >
                {unassignedStage?.data.map((task) => {
                    return (
                        <KanbanItem key={task.id} id={task.id}>
                            <ProjectCardMemo {...task} />
                        </KanbanItem>
                    );
                })}
                {!unassignedStage?.data?.length && (
                    <KanbanAddCardButton
                        onClick={() => handleAddCard({ stageId: "unassigned" })}
                    />
                )}
            </KanbanColumnMemo>
            {taskStages?.data.map((column) => {
                const contextMenuItems = getContextMenuItems({ column });

                return (
                    <KanbanColumnMemo
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        count={column.tasks.length}
                        contextMenuItems={contextMenuItems}
                        onAddClick={() => handleAddCard({ stageId: column.id })}
                    >
                        {column.tasks.map((task) => {
                            return (
                                <KanbanItem key={task.id} id={task.id}>
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
                    </KanbanColumnMemo>
                );
            })}
            <KanbanAddStageButton onClick={handleAddStage} />
        </KanbanBoard>
    );
};

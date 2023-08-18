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

const defaultContextMenuItems = {
    edit: {
        label: "Edit status",
        key: "1",
        icon: <EditOutlined />,
        onClick: () => {
            alert("not implemented");
        },
    },
    clear: {
        label: "Clear all cards",
        key: "2",
        icon: <ClearOutlined />,
        onClick: () => {
            alert("not implemented");
        },
    },
    delete: {
        danger: true,
        label: "Delete status",
        key: "3",
        icon: <DeleteOutlined />,
        onClick: () => {
            alert("not implemented");
        },
    },
};

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
    const { data: defaultStage, isLoading: isLoadingDefaultStage } =
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
        const stageId = event.over?.id as string;
        if (!stageId || !taskId) return;

        updateTask({
            resource: "stages",
            meta: {
                operation: "task",
            },
            id: taskId,
            values: {
                stageId: stageId === "default" ? null : stageId,
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

        const items = [
            {
                ...defaultContextMenuItems.edit,
                onClick: () => handleEditStage({ stageId: column.id }),
            },
        ];
        if (!hasItems) {
            items.push({
                ...defaultContextMenuItems.delete,
                onClick: () => handleDeleteStage({ stageId: column.id }),
            });
        }
        if (hasItems) {
            items.push({
                ...defaultContextMenuItems.clear,
                onClick: () =>
                    handleClearCards({
                        taskIds: column.tasks.map((task) => task.id),
                    }),
            });
        }

        return items;
    };

    const loading = isLoadingDefaultStage || isLoadingTaskStages;

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <KanbanBoard onDragEnd={handleOnDragEnd}>
            <KanbanColumnMemo
                id={"default"}
                title={"default"}
                count={defaultStage?.data?.length || 0}
                onAddClick={() => handleAddCard({ stageId: "default" })}
            >
                {defaultStage?.data.map((task) => {
                    return (
                        <KanbanItem key={task.id} id={task.id}>
                            <ProjectCardMemo {...task} />
                        </KanbanItem>
                    );
                })}
                {!defaultStage?.data?.length && (
                    <KanbanAddCardButton
                        onClick={() => handleAddCard({ stageId: "default" })}
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

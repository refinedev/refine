import { useMemo } from "react";
import {
    useCreate,
    useDelete,
    useList,
    useUpdate,
    useUpdateMany,
} from "@refinedev/core";
import { DragEndEvent } from "@dnd-kit/core";
import { DeleteOutlined, EditOutlined, ClearOutlined } from "@ant-design/icons";
import { Deal, DealStage } from "../../interfaces/graphql";
import { DealKanbanCardMemo, FullScreenLoading, Text } from "../../components";
import {
    Kanban,
    KanbanColumnMemo,
    KanbanItem,
    KanbanAddStageButton,
    KanbanAddCardButton,
} from "../../components/kanban";
import { currencyNumber } from "../../utilities";

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

const dealsFragment = [
    "id",
    "title",
    "value",
    "createdAt",
    {
        company: ["id", "name"],
    },
    {
        dealOwner: ["id", "name"],
    },
];

export const SalesPage = () => {
    const { data: defaultStage, isLoading: isLoadingDefaultStage } =
        useList<Deal>({
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
                operation: "deals",
                fields: dealsFragment,
            },
        });

    const { data: dealStages, isLoading: isLoadingDealStages } =
        useList<DealStage>({
            resource: "stages",
            pagination: {
                current: 1,
                pageSize: 999,
            },
            meta: {
                operation: "dealStages",
                fields: [
                    "id",
                    "title",
                    {
                        dealsAggregate: [
                            {
                                sum: ["value"],
                            },
                        ],
                    },
                    {
                        deals: dealsFragment,
                    },
                ],
            },
        });

    const { mutate: updateDeal } = useUpdate();
    const { mutate: updateManyDeal } = useUpdateMany();
    const { mutate: createStage } = useCreate();
    const { mutate: deleteStage } = useDelete();

    const { allStages, stageLost, stageWon } = useMemo(() => {
        if (!dealStages?.data) {
            return {
                stageWon: null,
                stageLost: null,
                allStages: [],
            };
        }

        const won = dealStages?.data.find((stage) => stage.title === "WON");
        const lost = dealStages?.data.find((stage) => stage.title === "LOST");

        return {
            stageWon: won,
            stageLost: lost,
            allStages: dealStages?.data.filter(
                (stage) => stage.title !== "WON" && stage.title !== "LOST",
            ),
        };
    }, [dealStages]);

    const handleOnDragEnd = (event: DragEndEvent) => {
        const dealId = event.active.id as string;
        const stageId = event.over?.id as string;
        if (!stageId || !dealId) return;

        updateDeal({
            resource: "stages",
            meta: {
                operation: "deal",
            },
            id: dealId,
            values: {
                stageId: stageId === "default" ? null : stageId,
            },
            successNotification: false,
        });
    };

    const handleAddStage = () => {
        const title = prompt("Enter stage title");
        alert("not implemented [title]: " + title);
    };
    const handleEditStage = (args: { stageId: string }) => {
        alert("not implemented [stageId]: " + args.stageId);
    };

    const handleDeleteStage = (args: { stageId: string }) => {
        alert("not implemented [stageId]: " + args.stageId);
    };

    const handleAddCard = (args: { stageId: string }) => {
        alert("not implemented [stageId]: " + args.stageId);
    };

    const handleClearCards = (args: { dealsIds: string[] }) => {
        alert("not implemented [stageId]: " + args.dealsIds);
    };

    const getContextMenuItems = ({ column }: { column: DealStage }) => {
        const hasItems = column.deals.length > 0;

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
                        dealsIds: column.deals.map((deal) => deal.id),
                    }),
            });
        }

        return items;
    };

    const loading = isLoadingDealStages || isLoadingDefaultStage;

    if (loading) {
        return <FullScreenLoading />;
    }

    console.log(defaultStage);

    return (
        <Kanban onDragEnd={handleOnDragEnd}>
            <KanbanColumnMemo
                id={"default"}
                title={"default"}
                count={defaultStage?.data?.length || 0}
                description={<Text size="md">{currencyNumber(0)}</Text>}
                onAddClick={() => handleAddCard({ stageId: "default" })}
            >
                {defaultStage?.data?.map((deal) => {
                    return (
                        <KanbanItem key={deal.id} id={deal.id}>
                            <DealKanbanCardMemo
                                id={deal.id}
                                key={deal.id}
                                title={deal.title}
                                company={{ name: deal.company.name }}
                                user={{ name: deal.dealOwner.name }}
                                date={deal.createdAt}
                                price={currencyNumber(deal.value || 0)}
                            />
                        </KanbanItem>
                    );
                })}
                {!defaultStage?.data?.length && (
                    <KanbanAddCardButton
                        onClick={() => handleAddCard({ stageId: "default" })}
                    />
                )}
            </KanbanColumnMemo>
            {allStages.map((column) => {
                const sum = column.dealsAggregate?.[0]?.sum?.value || 0;
                const contextMenuItems = getContextMenuItems({ column });

                return (
                    <KanbanColumnMemo
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        description={
                            <Text size="md" disabled={sum === 0}>
                                {currencyNumber(sum)}
                            </Text>
                        }
                        count={column.deals.length}
                        contextMenuItems={contextMenuItems}
                        onAddClick={() => handleAddCard({ stageId: column.id })}
                    >
                        {column.deals.map((deal) => {
                            return (
                                <KanbanItem key={deal.id} id={deal.id}>
                                    <DealKanbanCardMemo
                                        id={deal.id}
                                        key={deal.id}
                                        title={deal.title}
                                        company={{ name: deal.company.name }}
                                        user={{ name: deal.dealOwner.name }}
                                        date={deal.createdAt}
                                        price={currencyNumber(deal.value || 0)}
                                    />
                                </KanbanItem>
                            );
                        })}
                        {!column.deals.length && (
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
            {stageWon && (
                <KanbanColumnMemo
                    key={stageWon.id}
                    id={stageWon.id}
                    title={stageWon.title}
                    description={
                        <Text
                            size="md"
                            disabled={
                                stageWon.dealsAggregate?.[0]?.sum?.value === 0
                            }
                        >
                            {currencyNumber(
                                stageWon.dealsAggregate?.[0]?.sum?.value || 0,
                            )}
                        </Text>
                    }
                    count={stageWon.deals.length}
                    variant="solid"
                >
                    {stageWon.deals.map((deal) => {
                        return (
                            <KanbanItem key={deal.id} id={deal.id}>
                                <DealKanbanCardMemo
                                    id={deal.id}
                                    key={deal.id}
                                    title={deal.title}
                                    company={{ name: deal.company.name }}
                                    user={{ name: deal.dealOwner.name }}
                                    date={deal.createdAt}
                                    price={currencyNumber(deal.value || 0)}
                                    variant="won"
                                />
                            </KanbanItem>
                        );
                    })}
                </KanbanColumnMemo>
            )}
            {stageLost && (
                <KanbanColumnMemo
                    key={stageLost.id}
                    id={stageLost.id}
                    title={stageLost.title}
                    description={
                        <Text
                            size="md"
                            disabled={
                                stageLost.dealsAggregate?.[0]?.sum?.value === 0
                            }
                        >
                            {currencyNumber(
                                stageLost.dealsAggregate?.[0]?.sum?.value || 0,
                            )}
                        </Text>
                    }
                    count={stageLost.deals.length}
                    variant="solid"
                >
                    {stageLost.deals.map((deal) => {
                        return (
                            <KanbanItem key={deal.id} id={deal.id}>
                                <DealKanbanCardMemo
                                    id={deal.id}
                                    key={deal.id}
                                    title={deal.title}
                                    company={{ name: deal.company.name }}
                                    user={{ name: deal.dealOwner.name }}
                                    date={deal.createdAt}
                                    price={currencyNumber(deal.value || 0)}
                                    variant="lost"
                                />
                            </KanbanItem>
                        );
                    })}
                </KanbanColumnMemo>
            )}
        </Kanban>
    );
};

import { useMemo } from "react";
import { useList } from "@refinedev/core";
import { DealStage } from "../../interfaces/graphql";
import { FullScreenLoading, ProjectCardMemo } from "../../components";
import { Kanban, KanbanColumnMemo, KanbanItem } from "../../components/kanban";
import { DragEndEvent } from "@dnd-kit/core";
import { Addbutton } from "../../components/kanban/add-button";
import { currencyNumber } from "../../utilities";

export const SalesPage = () => {
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
                        deals: [
                            "id",
                            "title",
                            "value",
                            "createdAt",
                            {
                                company: ["id", "name", "totalRevenue"],
                            },
                            {
                                dealOwner: ["id", "name"],
                            },
                        ],
                    },
                ],
            },
        });

    const {
        allStages,
        stageLost,
        stageWon,
        stageLostTotalValue,
        stageWonTotalValue,
    } = useMemo(() => {
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
            stageWonTotalValue:
                won?.dealsAggregate?.[0]?.sum?.value || undefined,
            stageLost: lost,
            stageLostTotalValue:
                lost?.dealsAggregate?.[0]?.sum?.value || undefined,
            allStages: dealStages?.data.filter(
                (stage) => stage.title !== "WON" && stage.title !== "LOST",
            ),
        };
    }, [dealStages]);

    const handleOnDragEnd = (event: DragEndEvent) => {
        console.log(event);
    };

    const handleAddStage = () => {
        const title = prompt("Enter stage title");
    };

    const loading = isLoadingDealStages;

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <Kanban onDragEnd={handleOnDragEnd}>
            {allStages.map((column) => {
                const sum = column.dealsAggregate?.[0]?.sum?.value;
                const description = sum ? currencyNumber(sum) : undefined;

                return (
                    <KanbanColumnMemo
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        description={description}
                        count={column.deals.length}
                    >
                        {column.deals.map((deal) => {
                            return (
                                <KanbanItem key={deal.id} id={deal.id}>
                                    <div
                                        style={{
                                            display: "flex",
                                            padding: "8px",
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        {deal.title}
                                    </div>
                                </KanbanItem>
                            );
                        })}
                    </KanbanColumnMemo>
                );
            })}
            <Addbutton onClick={handleAddStage} />
            {stageWon && (
                <KanbanColumnMemo
                    key={stageWon.id}
                    id={stageWon.id}
                    title={stageWon.title}
                    description={
                        stageWonTotalValue
                            ? currencyNumber(stageWonTotalValue)
                            : undefined
                    }
                    count={stageWon.deals.length}
                    variant="solid"
                >
                    {stageWon.deals.map((deal) => {
                        return (
                            <KanbanItem key={deal.id} id={deal.id}>
                                <div
                                    style={{
                                        display: "flex",
                                        padding: "8px",
                                        backgroundColor:
                                            "rgba(217, 247, 190, 1)",
                                    }}
                                >
                                    {deal.title}
                                </div>
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
                        stageLostTotalValue
                            ? currencyNumber(stageLostTotalValue)
                            : undefined
                    }
                    count={stageLost.deals.length}
                    variant="solid"
                >
                    {stageLost.deals.map((deal) => {
                        return (
                            <KanbanItem key={deal.id} id={deal.id}>
                                <div
                                    style={{
                                        display: "flex",
                                        padding: "8px",
                                        backgroundColor:
                                            "rgba(255, 204, 199, 1)",
                                    }}
                                >
                                    {deal.title}
                                </div>
                            </KanbanItem>
                        );
                    })}
                </KanbanColumnMemo>
            )}
        </Kanban>
    );
};

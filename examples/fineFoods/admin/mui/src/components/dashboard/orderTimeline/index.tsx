//TODO: refine-mui doesn't have the following components:
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@mui/lab";
import { useTranslate, useNavigation, useTable } from "@pankod/refine-core";
import {
    Box,
    Button,
    Tooltip,
    Typography,
    Pagination,
} from "@pankod/refine-mui";
import dayjs from "dayjs";

import { IOrder } from "interfaces";

export const OrderTimeline: React.FC = () => {
    const t = useTranslate();
    const { show } = useNavigation();

    const { tableQueryResult, current, setCurrent, pageCount } =
        useTable<IOrder>({
            resource: "orders",
            initialSorter: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
            initialPageSize: 5,
            syncWithLocation: false,
        });

    const { data } = tableQueryResult;

    const orderStatusColor = (
        id: string,
    ): { color: string; text: string; dotColor: string } => {
        switch (id) {
            case "1":
                return {
                    color: "#fff7e6",
                    text: "pending",
                    dotColor: "#ffa940",
                };
            case "2":
                return { color: "#e6fffb", text: "ready", dotColor: "#36cfc9" };
            case "3":
                return {
                    color: "#f6ffed",
                    text: "on the way",
                    dotColor: "#73d13d",
                };
            case "4":
                return {
                    color: "#e6f7ff",
                    text: "delivered",
                    dotColor: "#40a9ff",
                };
            default:
                return {
                    color: "#fff1f0",
                    text: "cancelled",
                    dotColor: "#ff4d4f",
                };
        }
    };

    return (
        <>
            <Timeline position="right" sx={{ mt: 0, pt: 0 }}>
                {data?.data.map(({ createdAt, orderNumber, status, id }) => {
                    const text = orderStatusColor(status.id.toString())?.text;
                    const color = orderStatusColor(status.id.toString())?.color;
                    const dotColor = orderStatusColor(
                        status.id.toString(),
                    )?.dotColor;

                    return (
                        <TimelineItem key={orderNumber}>
                            <TimelineOppositeContent sx={{ display: "none" }} />
                            <TimelineSeparator>
                                <TimelineDot
                                    variant="outlined"
                                    sx={{ borderColor: dotColor }}
                                />
                                <TimelineConnector sx={{ width: "1px" }} />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Box
                                    sx={{
                                        backgroundColor: color,
                                        borderRadius: 2,
                                        p: 1,
                                    }}
                                >
                                    <Tooltip
                                        arrow
                                        title={dayjs(createdAt).format("lll")}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            {dayjs(createdAt).fromNow()}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="subtitle2">
                                        {t(
                                            `dashboard.timeline.orderStatuses.${text}`,
                                        )}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        onClick={() => show("orders", id)}
                                        size="small"
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: "text.primary" }}
                                        >
                                            #{orderNumber}
                                        </Typography>
                                    </Button>
                                </Box>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Pagination
                        count={pageCount}
                        page={current}
                        onChange={(e, page) => setCurrent(page)}
                        siblingCount={0}
                        boundaryCount={0}
                        size="small"
                        color="primary"
                    />
                </Box>
            </Timeline>
        </>
    );
};

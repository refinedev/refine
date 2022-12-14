import { useTranslate, useNavigation } from "@pankod/refine-core";
import {
    Typography,
    Timeline,
    useSimpleList,
    AntdList,
    Tooltip,
} from "@pankod/refine-antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IOrder } from "interfaces";
import "./style.less";

dayjs.extend(relativeTime);

export const OrderTimeline: React.FC = () => {
    const t = useTranslate();
    const { show } = useNavigation();

    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 6,
            simple: true,
        },
        syncWithLocation: false,
    });

    const { dataSource } = listProps;

    const { Text } = Typography;

    const orderStatusColor = (
        id: string,
    ): { color: string; text: string } | undefined => {
        switch (id) {
            case "1":
                return { color: "orange", text: "pending" };
            case "2":
                return { color: "cyan", text: "ready" };
            case "3":
                return { color: "green", text: "on the way" };
            case "4":
                return { color: "blue", text: "delivered" };
            case "5":
                return { color: "red", text: "cancelled" };
            default:
                break;
        }
    };

    return (
        <AntdList {...listProps}>
            <Timeline>
                {dataSource?.map(({ createdAt, orderNumber, status, id }) => (
                    <Timeline.Item
                        className="timeline__point"
                        key={orderNumber}
                        color={orderStatusColor(status.id.toString())?.color}
                    >
                        <div
                            className={`timeline ${
                                orderStatusColor(status.id.toString())?.color
                            }`}
                        >
                            <Tooltip
                                overlayInnerStyle={{ color: "#626262" }}
                                color="rgba(255, 255, 255, 0.3)"
                                placement="topLeft"
                                title={dayjs(createdAt).format("lll")}
                            >
                                <Text italic className="createdAt">
                                    {dayjs(createdAt).fromNow()}
                                </Text>
                            </Tooltip>
                            <Text>
                                {t(
                                    `dashboard.timeline.orderStatuses.${
                                        orderStatusColor(status.id.toString())
                                            ?.text
                                    }`,
                                )}
                            </Text>
                            <Text
                                onClick={() => show("orders", id)}
                                strong
                                className="number"
                            >
                                #{orderNumber}
                            </Text>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </AntdList>
    );
};

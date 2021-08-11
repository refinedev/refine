import {
    Typography,
    useTranslate,
    Timeline,
    useSimpleList,
    AntdList,
} from "@pankod/refine";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IOrder } from "interfaces";
import "./style.less";

dayjs.extend(relativeTime);

export const OrderTimeline: React.FC = () => {
    const t = useTranslate();

    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        sorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 6,
            simple: true,
        },
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
                {dataSource?.map(({ createdAt, orderNumber, status }) => (
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
                            <Text italic className="createdAt">
                                {dayjs(createdAt).fromNow()}
                            </Text>
                            <Text>
                                {t(
                                    `enum:orderStatuses.${
                                        orderStatusColor(status.id.toString())
                                            ?.text
                                    }`,
                                )}
                            </Text>
                            <Text strong className="number">
                                #{orderNumber}
                            </Text>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </AntdList>
    );
};

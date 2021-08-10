import {
    Typography,
    useApiUrl,
    useCustom,
    useTranslate,
    Timeline,
    useSimpleList,
    List,
    AntdList,
} from "@pankod/refine";
import { IOrder } from "interfaces";
import "./style.less";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
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
            total: 20,
        },
    });

    console.log({ listProps });

    const { dataSource } = listProps;

    const { Text } = Typography;

    const orderStatusColor = (id: string) => {
        switch (id) {
            case "1":
                return "orange";
                break;
            case "2":
                return "cyan";
                break;
            case "3":
                return "green";
                break;
            case "4":
                return "blue";
                break;
            case "5":
                return "red";
                break;
            default:
                break;
        }
    };

    return (
        <AntdList {...listProps}>
            <Timeline>
                {dataSource?.map(({ createdAt, orderNumber, status }) => (
                    <Timeline.Item
                        key={orderNumber}
                        color={orderStatusColor(status.id.toString())}
                    >
                        <div
                            className={`timeline ${orderStatusColor(
                                status.id.toString(),
                            )}`}
                        >
                            <Text className="createdAt">
                                {dayjs(createdAt).fromNow()}
                            </Text>
                            <Text>New order placed</Text>
                            <Text className="number">#{orderNumber}</Text>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </AntdList>
    );
};

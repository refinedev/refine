import { Typography, AntdList, useSimpleList } from "@pankod/refine";
import { IOrder } from "interfaces";

export const DeliverySchedule: React.FC = () => {
    const { Title } = Typography;

    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        sorter: [
            {
                field: "id",
                order: "asc",
            },
        ],

        pagination: {
            pageSize: 3,
        },
    });

    return (
        <>
            <Title level={5}>Upcoming Delivery Schedule</Title>

            <AntdList
                {...listProps}
                renderItem={(item) => (
                    <div>{`${item.id} - ${item.userId} - ${item.status.text}`}</div>
                )}
            />
        </>
    );
};

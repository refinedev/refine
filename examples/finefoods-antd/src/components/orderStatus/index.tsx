import { useTranslate } from "@pankod/refine-core";

import { Tag } from "@pankod/refine-antd";

type OrderStatusProps = {
    status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;

    switch (status) {
        case "Pending":
            color = "orange";
            break;
        case "Ready":
            color = "cyan";
            break;
        case "On The Way":
            color = "green";
            break;
        case "Delivered":
            color = "blue";
            break;
        case "Cancelled":
            color = "red";
            break;
    }

    return <Tag color={color}>{t(`enum.orderStatuses.${status}`)}</Tag>;
};

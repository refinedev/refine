import { Tag, useTranslate } from "@pankod/refine";

type OrderStatusProps = {
    status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

const orderStatusTranslationKeys: Record<OrderStatusProps["status"], string> = {
    Pending: "pending",
    Ready: "ready",
    "On The Way": "on the way",
    Delivered: "delivered",
    Cancelled: "cancelled",
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

    return (
        <Tag color={color}>
            {t(`enum.orderStatuses.${orderStatusTranslationKeys[status]}`)}
        </Tag>
    );
};

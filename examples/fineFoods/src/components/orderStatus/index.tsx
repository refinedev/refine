import { Typography } from "@pankod/refine";

import styles from "./styles";

type OrderStatusProps = {
    status: "pending" | "ready" | "on the way" | "delivered" | "cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    let color;

    switch (status) {
        case "pending":
            color = "#F39800";
            break;
        case "ready":
            color = "#36CFC9";
            break;
        case "on the way":
            color = "#67BE23";
            break;
        case "delivered":
            color = "#1890FF";
            break;
        case "cancelled":
            color = "#F5222D";
            break;
    }

    const { Text } = Typography;

    return (
        <div style={{ ...styles.container, backgroundColor: color }}>
            <Text style={styles.text}>{status}</Text>
        </div>
    );
};

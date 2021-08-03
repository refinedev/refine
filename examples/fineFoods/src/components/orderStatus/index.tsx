import { Typography } from "@pankod/refine";

import styles from "./styles";

type OrderStatusProps = {
    status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    let color;

    switch (status) {
        case "Pending":
            color = "#F39800";
            break;
        case "Ready":
            color = "#36CFC9";
            break;
        case "On The Way":
            color = "#67BE23";
            break;
        case "Delivered":
            color = "#1890FF";
            break;
        case "Cancelled":
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

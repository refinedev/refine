import { Typography } from "@pankod/refine";

import styles from "./styles";

type OrderStatusProps = {
    status:
        | "waiting"
        | "ready"
        | "on the way"
        | "delivered"
        | "could not be delivered";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    let color;

    switch (status) {
        case "waiting":
            color = "#F39800";
            break;
        case "ready":
            color = "#B033AB";
            break;
        case "on the way":
            color = "#1890FF";
            break;
        case "delivered":
            color = "#52C41A";
            break;
        case "could not be delivered":
            color = "#F5222D";
            break;
    }

    const { Text } = Typography;

    return (
        <Text style={styles.container}>
            <Text style={{ ...styles.icon, backgroundColor: color }}></Text>
            <Text style={styles.text}>{status}</Text>
        </Text>
    );
};

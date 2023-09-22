import { Audit, Deal } from "@/interfaces";

import { Text } from "../text";

type Props = {
    audit: Audit;
    deal?: Deal;
};

export const NotificationMessage = ({ audit, deal }: Props) => {
    if (!deal) return <Text>Loading...</Text>;

    if (audit.action === "UPDATE") {
        return (
            <Text>
                <Text strong>{audit.user?.name}</Text>
                {" moved "}
                <Text strong>{deal.title}</Text>
                {" deal to "}
                <Text strong>{deal.stage?.title || "Unassigned"}</Text>.
            </Text>
        );
    } else if (audit.action === "CREATE") {
        return (
            <Text>
                <Text strong>{audit.user?.name}</Text>
                {" created "}
                <Text strong>{deal.title}</Text>
                {" deal in "}
                <Text strong>{deal.stage?.title || "Unassigned"}</Text>.
            </Text>
        );
    }

    return <Text>Unknown action</Text>;
};

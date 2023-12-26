import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { NotificationsDealsQuery, NotificationsQuery } from "@/graphql/types";

import { Text } from "../text";

type Props = {
    audit: GetFieldsFromList<NotificationsQuery>;
    deal?: GetFieldsFromList<NotificationsDealsQuery>;
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

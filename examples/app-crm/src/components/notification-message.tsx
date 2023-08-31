import { Text } from "./text";

import { Audit, Task } from "../interfaces/graphql";

type Props = {
    audit: Audit;
    task?: Task;
};

export const NotificationMessage = ({ audit, task }: Props) => {
    if (!task) return <Text>Loading...</Text>;

    if (audit.action === "UPDATE") {
        return (
            <Text>
                <Text strong>{audit.user?.name}</Text>
                {" moved "}
                <Text strong>{task.title}</Text>
                {" task to "}
                <Text strong>{task.stage?.title || "Unassigned"}</Text> stage.
            </Text>
        );
    } else if (audit.action === "CREATE") {
        return (
            <Text>
                <Text strong>{audit.user?.name}</Text>
                {" created "}
                <Text strong>{task.title}</Text>
                {" task in "}
                <Text strong>{task.stage?.title || "Unassigned"}</Text> stage.
            </Text>
        );
    }

    return <Text>Unknown action</Text>;
};

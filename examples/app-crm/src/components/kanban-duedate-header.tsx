import { Typography } from "antd";

import { Text } from "../components/text";
import { Task } from "../interfaces/graphql";

type Props = {
    dueData?: Task["dueDate"];
};

export const KanbanDueDateHeader = ({ dueData }: Props) => {
    if (dueData) {
        return <Text>{dueData}</Text>;
    }
    return <Typography.Link>Add due date</Typography.Link>;
};

import { Typography } from "antd";

import { Text } from "../components/text";
import { Task } from "../interfaces/graphql";

type Props = {
    description?: Task["description"];
};

export const KanbanDescriptionHeader = ({ description }: Props) => {
    if (description) {
        return <Text>{description}</Text>;
    }

    return <Typography.Link>Add task description</Typography.Link>;
};

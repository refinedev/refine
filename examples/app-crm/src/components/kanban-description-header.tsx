import { Typography } from "antd";
import { MarkdownField } from "@refinedev/antd";

import { Task } from "../interfaces/graphql";

type Props = {
    description?: Task["description"];
};

export const KanbanDescriptionHeader = ({ description }: Props) => {
    if (description) {
        return <MarkdownField value={description} />;
    }

    return <Typography.Link>Add task description</Typography.Link>;
};

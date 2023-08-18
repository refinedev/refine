import { Typography } from "antd";

import { Task } from "../interfaces/graphql";

type Props = {
    checklist?: Task["checklist"];
};

export const KanbanChecklistHeader = ({ checklist = [] }: Props) => {
    if (checklist.length > 0) {
        return <div>Not implemented</div>;
    }

    return <Typography.Link>Assign to users</Typography.Link>;
};

import { Typography } from "antd";
import { MarkdownField } from "@refinedev/antd";

import { Task } from "../../interfaces/graphql";

type Props = {
    description?: Task["description"];
};

export const DescriptionHeader = ({ description }: Props) => {
    if (description) {
        return (
            <Typography.Paragraph ellipsis={{ rows: 8 }}>
                <MarkdownField value={description} />
            </Typography.Paragraph>
        );
    }

    return <Typography.Link>Add task description</Typography.Link>;
};

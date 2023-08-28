import { FC } from "react";
import { QuoteStatus } from "../../interfaces/graphql";
import {
    CheckCircleOutlined,
    ExpandOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { Tag } from "antd/lib";

const variant: Record<QuoteStatus, any> = {
    DRAFT: {
        color: "blue",
        icon: <ExpandOutlined />,
    },
    SENT: {
        color: "cyan",
        icon: <SendOutlined />,
    },
    ACCEPTED: {
        color: "green",
        icon: <CheckCircleOutlined />,
    },
};

type Props = {
    value: QuoteStatus;
};

export const QuoteStatusTag: FC<Props> = ({ value }) => {
    return (
        <Tag color={variant[value].color} icon={variant[value].icon}>
            {value}
        </Tag>
    );
};

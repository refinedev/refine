import React from "react";
import { Tag, TagProps } from "antd";
import {
    PlayCircleOutlined,
    PlayCircleFilled,
    CheckCircleOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";

import { ContactStatus } from "../../../enums/contact-status";

export const ContactStatusTag: React.FC<{ status: ContactStatus }> = ({
    status,
}) => {
    let icon: React.ReactNode = null;
    let color: TagProps["color"] = undefined;

    switch (status) {
        case ContactStatus.NEW:
        case ContactStatus.CONTACTED:
        case ContactStatus.INTERESTED:
            icon = <PlayCircleOutlined />;
            color = "cyan";
            break;
        case ContactStatus.UNQUALIFIED:
            icon = <PlayCircleOutlined />;
            color = "red";
            break;
        case ContactStatus.QUALIFIED:
        case ContactStatus.NEGOTIATION:
            icon = <PlayCircleFilled />;
            color = "green";
            break;
        case ContactStatus.LOST:
            icon = <PlayCircleFilled />;
            color = "red";
            break;
        case ContactStatus.WON:
            icon = <CheckCircleOutlined />;
            color = "green";
            break;
        case ContactStatus.CHURNED:
            icon = <MinusCircleOutlined />;
            color = "red";
            break;

        default:
            break;
    }

    return (
        <Tag color={color} style={{ textTransform: "capitalize" }}>
            {icon} {status.toLowerCase()}
        </Tag>
    );
};

import React, { PropsWithChildren } from "react";
import { AutoSaveIndicatorProps, useTranslate } from "@refinedev/core";
import { Typography, theme } from "antd";
import {
    CloudOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

const IconWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <span
            style={{
                position: "relative",
                top: "3px",
                left: "5px",
            }}
        >
            <CloudOutlined style={{ fontSize: "22px" }} />
            {children}
        </span>
    );
};

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
}) => {
    const translate = useTranslate();
    const { useToken } = theme;
    const { token } = useToken();

    let message = null;
    let icon = <IconWrapper />;

    switch (status) {
        case "success":
            message = translate("autosave.success", "saved");
            icon = (
                <IconWrapper>
                    <CheckCircleOutlined
                        style={{
                            fontSize: "10px",
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            background: token.colorBgLayout,
                            color: token.colorSuccess,
                            borderRadius: "50%",
                        }}
                    />
                </IconWrapper>
            );
            break;
        case "error":
            message = translate("autosave.error", "error");
            icon = (
                <IconWrapper>
                    <CloseCircleOutlined
                        style={{
                            fontSize: "10px",
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            background: token.colorBgLayout,
                            color: token.colorError,
                            borderRadius: "50%",
                        }}
                    />
                </IconWrapper>
            );

            break;
        case "loading":
            message = translate("autosave.loading", "saving changes...");
            icon = (
                <IconWrapper>
                    <SyncOutlined
                        spin
                        style={{
                            fontSize: "10px",
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            background: token.colorBgLayout,
                            color: token.colorInfo,
                            borderRadius: "50%",
                        }}
                    />
                </IconWrapper>
            );

            break;
        default:
            // for idle
            message = translate("autosave.idle", "waiting for changes");
            break;
    }

    return (
        <Typography.Text
            style={{
                marginRight: 5,
                color: token.colorTextTertiary,
                fontSize: ".8rem",
            }}
        >
            {message}
            {icon}
        </Typography.Text>
    );
};
